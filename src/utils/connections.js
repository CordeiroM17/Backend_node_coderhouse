import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://cordeiromariano17:ktAuPli2vRqq5Xcl@coder-cluster.w5gmkui.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!")
  } catch (e) {
    console.log(e)
    throw "can not connect to the db"
  }
}