import connectMongo from "../../../database/conn";
import {
  getProperties,
  postProperty,
  putProperty,
  deleteProperty,
} from "../../../database/controller";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getProperties(req, res);
      break;
    case "POST":
      postProperty(req, res);
      break;
    case "PUT":
      putProperty(req, res);
      //res.status(200).json({ method, name: "PUT Request" });
      break;
    case "DELETE":
      deleteProperty(req, res);
      //res.status(200).json({ method, name: "DELETE Request" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
