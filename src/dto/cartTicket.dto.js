export default class CartDTO {
  constructor(cart, quantity) {
    this.id = cart._id.toString(), 
    this.title = cart.title, 
    this.description = cart.description, 
    this.price = cart.price, 
    this.code = cart.code, 
    this.quantity = quantity;
  }
}
