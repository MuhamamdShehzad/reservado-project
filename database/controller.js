/* Controller */

import { NextResponse } from "next/server";
import Property from "../model/properties";
const cloudinary = require("../lib/cloudinary");
// GET all: http://localhost:3000/api/properties
export async function getProperties(req, res) {
  try {
    console.log("From getProperties");
    const property = await Property.find({});
    if (!property) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// GET : http://localhost:3000/api/properties/1
export async function getProperty(req, res) {
  try {
    console.log("From getProperty");
    const { propertyId } = req.query;

    if (propertyId) {
      const property = await Property.findById(propertyId);
      res.status(200).json(property);
    } else res.status(404).json({ error: "Property not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the Property...!" });
  }
}

// Post: http://localhost:3000/api/properties
/* export async function postProperty(req, res) {
  try {
    console.log("From postProperty");
    const {
      images,
      price,
      area,
      bedRooms,
      city,
      location,
      description,
      status,
      kitchen,
      diningRooms,
      bathRooms,
    } = req.body;
    try {
      if (images) {
        // loop on images array
        let imageArray = [];
        for (let i = 0; i < images.length; i++) {
          const uploadResponse = await cloudinary.uploader.upload(images[i], {
            upload_preset: "properties",
          });
          if (uploadResponse) {
            //console.log(uploadResponse);
            imageArray.push(uploadResponse.secure_url);
          } else {
            return res
              .status(404)
              .json({ error: "Error While Uploading the Image...!" });
          }
        }

        const formData = {
          images: [...imageArray],
          price,
          area,
          bedRooms,
          city,
          location,
          description,
          status,
          kitchen,
          diningRooms,
          bathRooms,
        };
        Property.create(formData, function (err, data) {
          return res.status(200).json(data);
        });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Error While Uploading the Image...!" });
    }
    return res.status(200).json({ sucess: "Form Data Provided...!" });
    /* 
    const formData = req.body;
    console.log(formData);
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    Property.create(formData, function (err, data) {
      return res.status(200).json(data);
    }); 
  } catch (error) {
    return res.status(404).json({ error });
  }
} */

export async function postProperty(req, res) {
  try {
    console.log("From postProperty");
    const {
      images,
      price,
      area,
      bedRooms,
      city,
      location,
      description,
      status,
      kitchen,
      diningRooms,
      bathRooms,
    } = req.body;
    console.log(req.body);
    try {
      if (images) {
        // loop on images array
        let imageArray = [];
        for (let i = 0; i < images.length; i++) {
          const uploadResponse = await cloudinary.uploader.upload(images[i], {
            upload_preset: "properties",
          });
          if (uploadResponse) {
            //console.log(uploadResponse);
            imageArray.push(uploadResponse.secure_url);
          } else {
            return res
              .status(404)
              .json({ error: "Error While Uploading the Image...!" });
          }
        }

        const formData = {
          images: [...imageArray],
          price,
          area,
          bedRooms,
          city,
          location,
          description,
          status,
          kitchen,
          diningRooms,
          bathRooms,
        };
        Property.create(formData, function (err, data) {
          return res.status(200).json(data);
        });
      } else {
        return res.status(404).json({ error: "Form Data Not Provided...!" });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Error While Uploading the Image...!" });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// put : http://localhost:3000/api/properties/1
export async function putProperty(req, res) {
  try {
    console.log("From putProperty");
    const { propertyId } = req.query;
    const formData = req.body;

    if (propertyId && formData) {
      const property = await Property.findByIdAndUpdate(propertyId, formData);
      res.status(200).json(property);
    } else res.status(404).json({ error: "Property Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/properties/1
export async function deleteProperty(req, res) {
  try {
    console.log("From deleteProperty");
    const { propertyId } = req.query;

    if (propertyId) {
      const property = await Property.findByIdAndDelete(propertyId);
      return res.status(200).json(property);
    }

    res.status(404).json({ error: "Property Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Property...!" });
  }
}
