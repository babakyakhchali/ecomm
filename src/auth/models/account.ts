import { Entity,  Column} from "typeorm";
import { BaseModelWithTs } from "../../core/models/base";

export enum AccountType {
    UsernamePassword = "UsernamePassword",
}

@Entity()
export class Account extends BaseModelWithTs{
    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({ type: "enum", enum: AccountType })
    atype!: AccountType;    

}