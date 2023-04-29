const BASE_URL = "http://localhost:3000/";

// all properties
export const getProperties = async () => {
  const response = await fetch(`${BASE_URL}/api/properties`);
  const json = await response.json();

  return json;
};

// single property
export const getProperty = async (propertyId) => {
  const response = await fetch(`${BASE_URL}api/properties/${propertyId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// posting a new property
export async function addProperty(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/properties`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a new property
export async function updateProperty(propertyId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}api/properties/${propertyId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Delete a new user
export async function deleteProperty(propertyId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}api/properties/${propertyId}`,
    Options
  );
  const json = await response.json();
  return json;
}
