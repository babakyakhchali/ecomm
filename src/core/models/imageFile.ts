import { BaseModelWithTs } from "./base";
import { Column, Entity } from "typeorm";

@Entity()
export abstract class ImageFile extends BaseModelWithTs{
    @Column()
    path!: string;    
    @Column()
    relUrl!:string;
    @Column()
    itype!: string;
    @Column()
    width!: number;
    @Column()
    height!: number;
    @Column()
    orginalName!:string;
}