import {
  getDataFromServer,
  getOneTarget,
  editOneTarget,
  addOneTarget,
} from "./getDataFromServer.js";
import {
  validateEmail,
  validatePhone,
  validateBirthday,
  validateRole,
  validateSalary,
} from "./backEndValidate.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const entity = "employees";

const form = document.getElementById("editForm");

const elId = document.getElementById("id");
const elFirstName = document.getElementById("firstName");
const elLastName = document.getElementById("lastName");
const elEmail = document.getElementById("email");

const elSalary = document.getElementById("salary");

const elPhone = document.getElementById("phone");
const elBirthday = document.getElementById("birthday");
const elRole = document.getElementById("role");

let currentObject = null;

function fillForm(employee) {
  elId.value = employee.id ?? "";
  elFirstName.value = employee.firstName ?? "";
  elLastName.value = employee.lastName ?? "";
  elEmail.value = employee.email ?? "";
  elPhone.value = employee.phone ?? "";
  elBirthday.value = employee.birthday ?? "";
  elRole.value = employee.role ?? "";
  elSalary.value = employee.salary ?? "";
}

function readForm() {
  //front validation
  if (!elFirstName.value.trim()) {
    alert("First name is required.");
    return null;
  }
  if (!elLastName.value.trim()) {
    alert("Last name is required.");
    return null;
  }
  if (!elEmail.value.trim() || !validateEmail(elEmail.value.trim())) {
    alert("Please enter a valid email address.");
    return null;
  }
  if (!elPhone.value.trim() || !validatePhone(elPhone.value.trim())) {
    alert("Please enter a valid phone number.");
    return null;
  }
  if (!elBirthday.value.trim() || !validateBirthday(elBirthday.value.trim())) {
    alert("Please enter a valid Birthday Like this DD/MM/YYYY.");
    return null;
  }
  // salary
  if (!elSalary.value.trim() || !validateSalary(elSalary.value.trim())) {
    alert("Please enter a salary number. with currency £");
    return null;
  }
  // role
  if (!elRole.value.trim() || !validateRole(elRole.value.trim())) {
    alert("Please enter a role of employee");
    return null;
  }

  return {
    ...currentObject,
    id: elId.value.trim(),
    firstName: elFirstName.value.trim(),
    lastName: elLastName.value.trim(),
    email: elEmail.value.trim(),
    salary: elSalary.value.trim(),
    phone: elPhone.value.trim(),
    birthday: elBirthday.value.trim(),
    role: elRole.value.trim(),
  };
}

async function loadTargetForEdit() {
  try {
    if (!id) {
      fillForm({});
      return;
    }

    const target = await getOneTarget(id, entity);
    if (!target) throw new Error("Record not found");

    currentObject = target;
    fillForm(target);
  } catch (err) {
    console.error(err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    if (id) {
      const updated = readForm();
      const saved = await editOneTarget(id, updated, entity);
      currentObject = saved;
    } else {
      // creating
      const newStd = readForm();
      const created = await addOneTarget(newStd, entity);

      currentObject = created;
    }
    window.location.href = `../../../FrontEndApplication/Html/employeesPage.html`;
  } catch (err) {
    console.error(err);
  }
});

loadTargetForEdit();
