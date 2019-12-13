import { Entity, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseModelWithTs } from "../../core/models/base";
import { Category } from "./category";
import { ProductAttribute } from "./productAttribute";
import { ProductImage } from './productImage';

@Entity()
export class Product extends BaseModelWithTs {    

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    code!: string;

    @ManyToOne(() => Category)
    @JoinColumn()
    category!: Category;

    @OneToMany(() => ProductAttribute, attr => attr.product)
    attributes!: ProductAttribute[];

    @Column({default:true})
    active!:boolean;

    @Column()
    tags!:string;

    @OneToMany(()=>ProductImage,img=>img.product)
    images!:ProductImage[];
}

