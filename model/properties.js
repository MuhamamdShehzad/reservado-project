import { Schema, models, model } from "mongoose";

const propertiesSchema = new Schema({
  images: [String],
  price: Number,
  area: Number,
  rent: Boolean,
  bedRooms: Number,
  bathRooms: Number,
  diningRooms: Number,
  kitchen: Number,
  storeRoom: Number,
  city: String,
  location: String,
});

const Property = models.property || model("property", propertiesSchema);

export default Property;
