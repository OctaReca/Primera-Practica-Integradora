import { cartModel } from "./models/cart.model.js"

class CartManager {
    async newCart() {
        await cartModel.create({products:[]});
        console.log("Carrito creado con exito");

        return true;
    }

    async getCart(id) {
        if (this.validateId(id)) {
            return await cartModel.findOne({_id:id}).lean() || null;
        } else {
            console.log("Error el id no es valido");

            return null;
        }
    }

    async getCarts() {
        return await cartModel.find().lean();
    }

    async addProductsToCart(cid, pid) {
        try {
            if(this.validateId(cid)) {
                const cart = await this.getCart(cid);
                const product = cart.products.find(item => item.product === pid);

                if (product) {
                    product.quantity++;
                } else {
                    cart.products.push({product:pid, quantity:1});
                }

                await cartModel.updateOne({_id:cid}, {products:cart.products}); 
                console.log("Producto agregado con exito");
                return true;
            } else {
                console.log("Error el id no es valido");
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }
}

export default CartManager;
