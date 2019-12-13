import { Entity, Tree, Column, TreeChildren, TreeParent,  OneToMany, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from "typeorm";
import { BaseModelWithTs } from "../../core/models/base";
import { Product } from "./product";
import { Attribute } from "./attribute";

@Entity()
@Tree("closure-table")
export class Category extends BaseModelWithTs{
   
    @Column()
    name!: string;

    @Column()
    normalizeName!:string

    @TreeChildren()
    children!: Category[];

    @TreeParent()
    parent!: Category;

    @OneToMany(() => Product, product => product.category,{eager:false})
    products?: Product[];
    
    @ManyToMany(() => Attribute)
    @JoinTable()
    attributes?: Attribute[];

    @BeforeUpdate()
    @BeforeInsert()
    onsert() {
        this.normalizeName = this.name.toLowerCase()
    }
}