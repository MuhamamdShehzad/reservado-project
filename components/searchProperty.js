import { useReducer, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Bug from "./bug";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function SearchPropertyForm({ onSearch }) {
  const [formData, setFormData] = useReducer(formReducer, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let { price, city, area, bedRooms } = formData;

    onSearch(formData);
  };

  return (
    <form
      className="mx-12 grid lg:grid-cols-2 w-6/6 gap-4 mb-7 p-7"
      onSubmit={handleSubmit}
    >
      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="price"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Price"
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
        />
      </div>

      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="area"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Area in sq. feet"
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
          min="0"
        />
      </div>

      <button className="flex justify-center items-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Search{" "}
        <span className="px-1">
          <BiSearch size={24}></BiSearch>
        </span>
      </button>
    </form>
  );
}
