import mongoose from "mongoose";

//"mongodb+srv://mshehzad:dydwSx3g3vVURxP4@reservado.dwlniye.mongodb.net/?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState == 1) {
      console.log("Database Connection");
    }
  } catch (error) {
    console.log("------- Error in the connection ------------");
    return Promise.reject(error);
  }
};
export default connectMongo;
