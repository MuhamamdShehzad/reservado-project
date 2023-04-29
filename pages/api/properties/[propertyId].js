import connectMongo from "../../../database/conn";
import {
  getProperty,
  putProperty,
  deleteProperty,
} from "../../../database/controller";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "7mb",
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
      getProperty(req, res);
      break;
    case "PUT":
      putProperty(req, res);
      break;
    case "DELETE":
      deleteProperty(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
