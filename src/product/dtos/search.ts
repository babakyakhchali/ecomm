export class ProductSearchItem {
    category?:string;
    attributes?:{id:number,cond:{op:'eq'|'in'|'lt'|'gt',value:string|string[]}}[];
    tag?:string;
}

export class ProductSearch {
    items?:ProductSearchItem[];
}



/**
 * 1) user searches based on a tag. like sshirt first page. this searches all prdducts just by tag
 * 2) user searces based on a category with or without attributes and with or without tags
 * first we find all subcategories
 * next if attributes are present join products with productAttributes and attributes and apply filters
 * if any tag is present apply it after above steps *       
 */