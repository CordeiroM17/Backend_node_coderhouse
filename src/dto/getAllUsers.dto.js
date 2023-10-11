export default class getAllUsersDTO {
  constructor(user) {
    (this._id = user._id.toString()),
    (this.name = user.firstName + ' ' + user.lastName),
    (this.email = user.email),
    (this.rol = user.rol);
    (this.cart = user.cart);
  }
}
