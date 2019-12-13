import { BaseModelWithTs } from "../../core/models/base";

import { Column, Entity } from "typeorm";

export enum AttributeType {
    String = "String",
    Number = "Number",
    DateTime = "DateTime",
    Options = "Options"
}
@Entity()
export class Attribute extends BaseModelWithTs {
    @Column()
    aname!: string;

    @Column({ type: 'enum', enum: AttributeType })
    atype!: string;

    @Column({ nullable: true })
    valueMin?: number;

    @Column({ nullable: true })
    valueMax?: number;

    @Column({ nullable: true })
    valueEnum?: string;

    @Column({ default: false })
    required?: boolean;

    validate(v: string) {
        switch (this.atype) {
            case AttributeType.DateTime:
            case AttributeType.Number:
                const nv = parseFloat(v);
                if (this.required && isNaN(nv)) {
                    return 'EmptyOrNotValidNumber'
                }
                if ((this.valueMin == 0 && nv < 0) || (this.valueMin && this.valueMin > nv)) {
                    return 'TooLowValue';
                }
                if ((this.valueMax == 0 && nv > 0) || (this.valueMax && this.valueMax < nv)) {
                    return 'TooBigValue';
                }
                break;
            case AttributeType.String:
                if (this.required && !v) {
                    return 'EmptyValue'
                }
                break;
            case AttributeType.Options:
                if (this.required && !v) {
                    return 'EmptyOptionValue'
                }
                if(!this.valueEnum!.split(',').includes(v)){
                    return 'NotValudOption';
                }
                break;
            default:                
                break;
        }
        return null;
    }
}