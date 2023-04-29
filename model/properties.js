import { Schema, models, model } from "mongoose";

const propertiesSchema = new Schema({
  images: [String],
  price: Number,
  area: Number,
  bedRooms: Number,
  bathRooms: Number,
  diningRooms: Number,
  kitchen: Number,
  city: String,
  location: String,
  description: String,
  status: String,
});

const Property = models.property || model("property", propertiesSchema);

export default Property;
