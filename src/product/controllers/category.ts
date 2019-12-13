
import { Param, Body, Get, Post, JsonController, QueryParam } from "routing-controllers";
import { getConnection, TreeRepository } from "typeorm";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { Attribute } from "../models/attribute";
@JsonController()
export class CategoryController {
    _repo!: TreeRepository<Category>;
    get repo() {
        if (!this._repo) {
            return this._repo = getConnection().getTreeRepository(Category)
        }
        return this._repo;
    }

    @Get("/categories")
    getAll(@QueryParam("tree") tree: boolean) {
        if (tree) {
            return this.repo.findTrees()
        }
        return this.repo.find();
    }

    @Get("/categories/:id/children")
    async getCategoryChildren(@Param("id") id: string) {
        const parent = await this.repo.findOne(id);
        if(!parent){
            return [];
        }
        return this.repo.findDescendants(parent);        
    }

    @Get("/categories/:id/products")
    async getCategoryProducts(@Param("id") id: string) {
        const res:Array<Product> = new Array;
        const children = await this.getCategoryChildren(id);        
        if(!children){
            return [];
        }
        for (const p of children) {
            const pp = await this.repo.findOne(p.id,{relations:['products']});
            if(pp){
                res.push(...pp.products!);
            }            
        }
        return res;    
    }

    @Post("/categories")
    post(@Body() p: Category) {
        return this.repo.save(p);
    }

    @Post("/categories/:id/attributes")
    async setAttributes(@Param("id") id: string,@Body() p: Attribute[]) {
        const c = await this.repo.findOne(id);        
        if(!c){
            throw 'NotFound';
        }       
        c.attributes = await getConnection().getRepository(Attribute).save(p);
        this.repo.save(c);
        return c;        
    }

    @Get("/categories/:id/attributes")
    async getAttributes(@Param("id") id: number){
        const c = await this.repo.findOne(id);
        if(!c){
            throw 'NotFound';
        } 
        const parents = await this.repo.findAncestors(c);
        const res:Array<Attribute> = [];
        for (const p of parents) {
            let cc = await this.repo.findOne(p.id,{relations:['attributes']})
            if(cc){
                res.push(...cc.attributes!);
            }            
        }
        return res;
    }
}