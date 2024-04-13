import { ForSaleItem } from "./for-sale-item.model";

export default class User {

    constructor(
        public username: string,
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public storeName: string,
        public forSaleItems: ForSaleItem[]
        
        ){}

    


}