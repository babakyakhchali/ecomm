import { ManyToOne, JoinColumn,Entity } from "typeorm";
import { Product } from "./product";
import { ImageFile } from "../../core/models/imageFile";

@Entity()
export class ProductImage extends ImageFile {
    @ManyToOne(() => Product)
    @JoinColumn()
    product!: Product;
}