export default class CurrentDTO {
  constructor(session) {
    (this.id = session._id), 
    (this.email = session.email), 
    (this.name = session.firstName + ' ' + session.lastName), 
    (this.cart = session.cart), 
    (this.rol = session.rol);
  }
}
