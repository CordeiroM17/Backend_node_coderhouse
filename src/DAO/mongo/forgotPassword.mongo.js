import { RecoverCodesModel } from './models/recoverCodes.js';

export default class ForgotPassword {
  constructor() {}

  createPasswordRecover = async (email, code) => {
    await RecoverCodesModel.create({ email: email, code: code, expire: Date.now() + 1 * 60 * 60 * 1000 });
  };

  findCode = async (email, code) => {
    return await RecoverCodesModel.findOne({ email, code });
  };
}
