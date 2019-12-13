
import { Param, Body, Get, Post, Delete, JsonController, Patch, UploadedFile } from "routing-controllers";
import { getConnection, Repository } from "typeorm";
import { Product } from "../models/product";
import { ProductAttribute } from '../models/productAttribute';
import { categoryService } from '../services/category';
import { join, extname } from "path";
import { ROOT_DIR } from "../../core";
import { move, removeSync } from "fs-extra";
import { fileUploadOptions } from "../../core/controllers";
import { getImageDimensions } from "../../core/utils/image";
import { ProductImage } from "../models/productImage";

import uuid = require("uuid");
@JsonController()
export class ProductController {
    _repo!: Repository<Product>;
    get repo() {
        if (!this._repo) {
            return this._repo = getConnection().getRepository(Product)
        }
        return this._repo;
    }

    @Get("/products")
    getAll() {
        return this.repo.find();
    }

    @Get("/products/:id")
    getDetails(@Param('id') id: number) {
        return this.repo.findOne(id, { relations: ['category', 'attributes', 'attributes.attribute','images'] });
    }

    @Post("/products")
    post(@Body() p: Product) {
        return this.repo.save(p);
    }

    @Post("/products/:id/attributes")
    async setAttributes(@Param('id') id: number, @Body() attributes: ProductAttribute[]) {
        const c = await this.repo.findOne(id);
        if (!c) {
            throw 'NotFound';
        }
        const allowedAttributes = await categoryService.getAttributesForCategory(c.category.id);
        if (!allowedAttributes || allowedAttributes.length == 0) {
            throw 'NoAttributesAreAllowed';
        }
        for (const attr of attributes) {
            let fa = allowedAttributes.find(a => a.id == attr.id);
            if (!fa) {
                throw 'NotAllowed:' + attr.id;
            }
            if (fa.validate(attr.avalue)) {
                throw 'ValidationFailed:' + attr.id;
            }
        }
        c.attributes = await getConnection().getRepository(ProductAttribute).save(attributes);
        this.repo.save(c);
        return c;
    }

    @Delete("/products/:id")
    deactivate(@Param('id') id: number) {
        return this.repo.update({ id: id }, { active: false });
    }

    @Patch("/products/:id")
    update(@Param('id') id: number, @Body() b: Partial<Product>) {
        delete b.attributes;
        return this.repo.update({ id: id }, b);
    }

    @Post("/products/:id/image")
    async setImage(@Param('id') id: number, @UploadedFile("productImage", { options: fileUploadOptions }) file: Express.Multer.File) {
        const p = await this.repo.findOne(id,{relations:['images']});
        if(!p){
            throw 'NotFound';
        }        
        const relPath = `/static/product/${id}/images/${uuid.v4() + extname(file.originalname)}` ;
        const npath = join(ROOT_DIR, 'storage', 'product',id.toString(),'images', uuid.v4() + extname(file.originalname));
        await move(file.path, npath, { overwrite: true });
        const imangeInfo = getImageDimensions(npath);
        removeSync(file.destination);
        const img = await getConnection().getRepository(ProductImage).save(<Partial<ProductImage>>{
            width: imangeInfo.width
            , itype: imangeInfo.type
            , height: imangeInfo.height
            , orginalName: file.originalname
            , path: npath
            ,relUrl:relPath
        });        
        p.images.push(img);
        await this.repo.save(p);
        return img;
    }

}