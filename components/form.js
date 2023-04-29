import UpdatePropertyForm from "./updateProperty";
import AddPropertyForm from "./addProperty";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);

  return (
    <div className="container mx-auto py-5">
      {formId
        ? UpdatePropertyForm({ formId, formData, setFormData })
        : AddPropertyForm({ formData, setFormData })}
    </div>
  );
}
