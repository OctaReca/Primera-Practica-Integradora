import { Router } from "express";
import CartManager from "../dao/CartManager.js"

const CartRouter = Router();
const CM = new CartManager();

CartRouter.post("/", async (req, res) => {
    const newCart = await CM.newCart();

    if (newCart) {
        res.send({ status: "ok", message: "Carrito creado con éxito!" });
    } else {
        res.status(500).send({ status: "error", message: "Error! No se pudo crear el carrito!" });
    }
});

CartRouter.get("/", async (req, res) => {
    res.send(await CM.getCarts())
})

CartRouter.get("/:id", async (req, res) => {
    const cid = req.params.id;
    const cart = await CM.getCart(cid);

    if (cart) {
        res.send({products: cart.products});
    } else {
        res.status(400).send({status:"error", message:"Error! No se encontró el carrito!"});
    }
});

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await CM.addProductsToCart(cid, pid);

    if (result) {
        res.send({status:"ok", message:"El Producto se agregó correctamente!"});
    } else {
        res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto!"});
    }
});

export default CartRouter;
