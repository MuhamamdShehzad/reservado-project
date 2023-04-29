import { BiEdit, BiTrash } from "react-icons/bi";
import { IoMdOpen } from "react-icons/io";
import { getProperties } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  deleteAction,
  toggleChangeAction,
  updateAction,
} from "../redux/reducer";

export default function Table({ data }) {
  /*  const { isLoading, isError, data, error } = useQuery(
    "property",
    getProperties
  );
  if (isLoading) return <div>Data is Loading...</div>;
  if (isError) return <div>Got Error {error}</div>; */

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-12 py-2">
            <span className="text-gray-200">Price (Rupees)</span>
          </th>
          <th className="px-12 py-2">
            <span className="text-gray-200">City</span>
          </th>
          <th className="px-12 py-2">
            <span className="text-gray-200">Area (Sq. Feet)</span>
          </th>

          <th className="px-12 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-12 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, i) => (
          <TR {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function TR({ _id, price, city, area, status }) {
  /* price, city, area, status */
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };
  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };
  const onOpen = () => {};

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2">
        <span>{price || 5000}</span>
      </td>
      <td className="px-16 py-2">
        <span>{city || "UnKnown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{area} sq. feet</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              status == "Active" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status || "Active"}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5 ">
        <button className="cursor">
          <BiEdit
            className="cursor"
            onClick={onUpdate}
            size={25}
            color={"rgb(34,197,94)"}
          />
        </button>
        <button>
          <BiTrash
            className="cursor"
            onClick={onDelete}
            size={25}
            color="rgb(244,63,94)"
          />
        </button>
        <Link href={`/properties/${_id}`}>
          <IoMdOpen className="cursor" size={25} color="rgb(244,63,94)" />
        </Link>
      </td>
    </tr>
  );
}
