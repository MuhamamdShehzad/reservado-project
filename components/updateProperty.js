import { useReducer } from "react";
import { BiBrush } from "react-icons/bi";
import Bug from "./bug";
import { getProperties, getProperty, updateProperty } from "../lib/helper";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function UpdatePropertyForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["property", formId],
    () => getProperty(formId)
  );
  const UpdateMutation = useMutation(
    (newData) => updateProperty(formId, newData),
    {
      onSuccess: async (data) => {
        // queryClient.setQueryData('users', (old) => [data])
        queryClient.prefetchQuery("property", getProperties);
      },
    }
  );

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const {
    price,
    city,
    location,
    area,
    bedRooms,
    bathRooms,
    diningRooms,
    kitchen,
    description,
    status,
  } = data;

  const handleSubmit = async (e) => {
    // console.log(data);
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    let updated = Object.assign({}, data, formData);
    await UpdateMutation.mutate(updated);
  };

  return (
    <form
      className="grid lg:grid-cols-4 w-6/6 gap-4 mb-7 p-7"
      onSubmit={handleSubmit}
    >
      <div className="input-type">
        <input
          type="number"
          defaultValue={price}
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
          defaultValue={city}
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
          defaultValue={area}
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
          defaultValue={location}
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
          defaultValue={bedRooms}
          onChange={setFormData}
          name="bedrooms"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="BedRooms"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          defaultValue={bathRooms}
          onChange={setFormData}
          name="bathrooms"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="BathRooms"
          required
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          defaultValue={diningRooms}
          onChange={setFormData}
          name="diningrooms"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Dining Rooms"
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          defaultValue={kitchen}
          onChange={setFormData}
          name="kitchen"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Kitchen"
          min="0"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          defaultValue={description}
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
            defaultChecked={status == "Active"}
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
            defaultChecked={status !== "Active"}
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
        Update{" "}
        <span className="px-1">
          <BiBrush size={24}></BiBrush>
        </span>
      </button>
    </form>
  );
}
