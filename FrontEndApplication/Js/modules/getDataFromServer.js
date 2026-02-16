import {
  validateStudentObject,
  validateCoursesObject,
} from "./backEndValidate.js";

export async function getDataFromServer(url) {
  if (
    typeof url !== "string" ||
    url === "" ||
    !url.includes("http://localhost:")
  )
    throw new Error(
      "URL should be string and not empty and contain http://localhost",
    );
  // get data
  let data;
  try {
    let response = await fetch(url);
    data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data Error > ${error}`);
  }
}
export function getCurrentData(data, start, end) {
  let result = [];
  for (let i = start - 1; i < data.length && i < end; i++) result.push(data[i]);
  return result;
}

export async function getOneTarget(id, targetObject) {
  if (!id) {
    throw new Error("ID is required");
  }

  try {
    const response = await fetch(`http://localhost:3000/${targetObject}/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${targetObject}. Status: ${response.status}`,
      );
    }

    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(`Error fetching ${targetObject} > ${error}`);
  }
}

export async function deleteOneTarget(id, targetObject) {
  if (!id) {
    throw new Error("ID is required for deletion");
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${targetObject}/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete. Status: ${response.status}`);
    }

    alert(`${targetObject} with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Delete error > ${error}`);
  }
}

export async function editOneTarget(id, object, targetObject) {
  try {
    if (!id) throw new Error("ID is required");
    if (!object) throw new Error("Updated object is required");

    //back validation
    if (targetObject === "students") {
      validateStudentObject(object);
    }
    if (targetObject === "courses") {
      validateCoursesObject(object);
    }

    const res = await fetch(`http://localhost:3000/${targetObject}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    if (!res.ok)
      throw new Error(`Save failed: ${res.status} ${res.statusText}`);

    const saved = await res.json();
    return saved;
  } catch (err) {
    console.error("Edit error:", err);
    throw err;
  }
}

export async function addOneTarget(object, targetObject) {
  try {
    if (!object) throw new Error("Object is required for creation");

    //back validation
    if (targetObject === "students") {
      validateStudentObject(object);
    }
    if (targetObject === "courses") {
      validateCoursesObject(object);
    }

    const res = await fetch(`http://localhost:3000/${targetObject}`);
    const data = await res.json();

    const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);

    object.id = (maxId + 1).toString();

    const createRes = await fetch(`http://localhost:3000/${targetObject}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    if (!createRes.ok)
      throw new Error(
        `Creation failed: ${createRes.status} ${createRes.statusText}`,
      );

    const created = await createRes.json();
    return created;
  } catch (err) {
    console.error("Creation error:", err);
    throw err;
  }
}
