/* Controller */

import { NextResponse } from "next/server";
import Property from "../model/properties";

// Get all: http://localhost:3000/api/hello
export async function getProperties(req) {
  try {
    console.log("From getProperties");
    const properties = await Property.find({});
    if (!properties)
      return NextResponse.json({ error: "Data Not Found" }, { status: 404 });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    const { method } = req;
    return new Response(
      JSON.stringify({ method, error: "Error from catch of getproperties" })
    );
  }
}

// Post: http://localhost:3000/api/hello
export async function postProperties(req) {
  try {
    console.log("From postProperties");
    const formData = await req.json();
    if (!formData)
      return NextResponse.json(
        { error: "Form Data Not Provided ...!" },
        { status: 404 }
      );

    // console.log(formData);
    Property.create(formData, function (err, data) {
      if (err) {
        console.log("---> Error Occured ... ");
      }
      // console.log("post successfull");
      // console.log(data);
      return NextResponse.json(data, { status: 200 });
      //return new Response(data);
    });
  } catch (error) {
    const { method } = req;
    return new Response(
      JSON.stringify({ method, error: "Error in the connection" })
    );
  }
}

// PUT : http://localhost:3000/api/hello
export async function putProperties(req) {
  try {
    console.log("From putProperties");
    /* const data = await req.json();
    const { propertyId } = req.query(); */
    //console.log(data)
    const d = req.body;
    console.log(d);
  } catch (error) {
    const { method } = req;
    return new Response(
      JSON.stringify({ method, error: "Error from catch of putproperties" })
    );
  }
}
