import mongoose from 'mongoose';
import { entorno } from '../dirname.js';

export let Users;

switch (entorno.PERSISTENCE) {
  case 'MONGO':
    console.log('Mongo connect');
    mongoose.connect(entorno.MONGO_URL);

    const { default: UsersMongo } = await import('./mongo/users.mongo.js');
    Users = UsersMongo;

    break;
  case 'MEMORY':
    console.log('Persistence with Memory');
    const { default: ContactsMemory } = await import('./memory/contacts.memory.js');

    Contacts = ContactsMemory;

    break;
  default:
    break;
}