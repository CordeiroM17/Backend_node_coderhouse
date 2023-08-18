import { Schema, model } from 'mongoose';

const schema = new Schema({
  code: {type: String, required: true}, //Generar Aleatorio
  purchase_datetime: {}, //Fecha de compra
  amount: {type: Number},
  purchaser: {type: String}, //Quien lo compra, solo el correo
});

export const TicketsModel = model('tickets', schema);