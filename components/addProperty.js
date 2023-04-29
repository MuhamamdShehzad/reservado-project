import { useReducer, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addProperty, getProperties } from "../lib/helper";

export default function AddPropertyForm({ formData, setFormData }) {
  const queryClient = useQueryClient();
  const [imageURL, setImageURL] = useState([]);
  const addMutation = useMutation(addProperty, {
    onSuccess: () => {
      queryClient.prefetchQuery("property", getProperties);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    let {
      price,
      city,
      location,
      area,
      bedRooms,
      bathRooms,
      diningRooms,
      kitchen,
      image,
      description,
      status,
    } = formData;
    const model = {
      images: [...imageURL],
      price,
      city,
      location,
      area,
      bedRooms,
      bathRooms,
      diningRooms,
      kitchen,
      description,
      status: status ?? "Active",
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError)
    return <Bug message={addMutation.error.message}></Bug>;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfully"}></Success>;

  const onChangeImageHandler = (e) => {
    const files = e.target.files;
    //console.log(files);
    TransformFile(files);
  };
  const TransformFile = (files) => {
    if (files) {
      // for loop for handling multiple files
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          setImageURL((prevState) => [...prevState, reader.result]);
        };
      }
    } else {
      setImageURL("");
    }
  };

  return (
    <form
      className="grid lg:grid-cols-4 w-6/6 gap-4 mb-7 p-7"
      onSubmit={handleSubmit}
      method="post"
      encType="multipart/form-data"
    >
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="price"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Price"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="city"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="City"
          required
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="area"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Area in sq. feet"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="location"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Map Location"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="bedRooms"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="BedRooms"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="bathRooms"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="BathRooms"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="diningRooms"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Dining Rooms"
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="kitchen"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Kitchen"
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="file"
          multiple="multiple"
          id="image"
          name="image"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          accept="image/"
          required
          onChange={onChangeImageHandler}
        ></input>
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="description"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Description"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="Inactive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
            Inactive
          </label>
        </div>
      </div>

      <button className="flex justify-center items-center text-md w-3/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{" "}
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
}
