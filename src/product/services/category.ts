import { TreeRepository, getConnection } from "typeorm";

import { Category } from "../models/category";

import { Attribute } from "../models/attribute";

class CategoryService {
    _repo!: TreeRepository<Category>;
    get repo() {
        if (!this._repo) {
            return this._repo = getConnection().getTreeRepository(Category)
        }
        return this._repo;
    }
    async getAttributesForCategory(id: number) {
        const c = await this.repo.findOne(id);
        if (!c) {
            throw 'NotFound';
        }
        const parents = await this.repo.findAncestors(c);
        const res: Array<Attribute> = [];
        for (const p of parents) {
            let cc = await this.repo.findOne(p.id, { relations: ['attributes'] })
            if (cc) {
                res.push(...cc.attributes!);
            }
        }
        return res;
    }
}

export const categoryService = new CategoryService();