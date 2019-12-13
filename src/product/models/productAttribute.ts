import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModelWithTs } from "../../core/models/base";
import { Product } from "./product";
import { Attribute } from './attribute';

@Entity()
export class ProductAttribute extends BaseModelWithTs {    
    @Column()
    avalue!:string;

    @ManyToOne(()=>Product)
    @JoinColumn()
    product!:Product

    @ManyToOne(() => Attribute,{nullable:false})
    @JoinColumn()
    attribute!: Attribute;

    validate(){
        return this.attribute.validate(this.avalue);
    }
    
}