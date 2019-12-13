import { Entity, PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class BaseModel {

    @PrimaryGeneratedColumn()
    id!: number;   
    
}

@Entity()
export abstract class BaseModelWithTs extends BaseModel {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}