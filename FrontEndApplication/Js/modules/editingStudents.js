import { getDataFromServer, getOneTarget, editOneTarget ,addOneTarget} from "./getDataFromServer.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const entity = "students";

const form = document.getElementById("editForm");

const elId = document.getElementById("id");
const elFirstName = document.getElementById("firstName");
const elLastName = document.getElementById("lastName");
const elEmail = document.getElementById("email");

const genderMale = document.getElementById("genderMale");
const genderFemale = document.getElementById("genderFemale");

const elPhone = document.getElementById("phone");
const elBirthday = document.getElementById("birthday");
const coursesBox = document.getElementById("coursesBox");

let currentObject = null;


async function renderCoursesCheckboxes(selected = []) {
  coursesBox.innerHTML = "";
  const courses = await getDataFromServer("http://localhost:3000/courses")
  // console.log(courses)
  for (let i = 1 ; i <= 20; i++) { //  must start with 1 cuz the data in the array 1  or greater but in the response it is an array pf length 20 start with 0
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "6px";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = String(i);
    cb.className = "courseCheck";

    if (selected.includes(i)) cb.checked = true;

    const text = document.createElement("span");

    text.textContent = `Course ${courses[i - 1].courseName}`;

    label.appendChild(cb);
    label.appendChild(text);
    coursesBox.appendChild(label);
  }
}

function fillForm(student) {
  elId.value = student.id ?? "";
  elFirstName.value = student.firstName ?? "";
  elLastName.value = student.lastName ?? "";
  elEmail.value = student.email ?? "";
  elPhone.value = student.phone ?? "";
  elBirthday.value = student.birthday ?? "";

  const g = student.gender ?? "";
  genderMale.checked = g === "Male";
  genderFemale.checked = g === "Female";

  // courses 
  const selected = Array.isArray(student.courses)
      ? student.courses
      : [];

  renderCoursesCheckboxes(selected.map(Number));
}

function readForm() {
  const gender =
    document.querySelector("input[name='gender']:checked")?.value || "";

  const selectedCourses = Array.from(
    document.querySelectorAll(".courseCheck:checked")
  ).map((cb) => Number(cb.value));

  return {
    ...currentObject,
    // id:elId.value.trim(),
    firstName: elFirstName.value.trim(),
    lastName: elLastName.value.trim(),
    email: elEmail.value.trim(),
    gender,
    phone: elPhone.value.trim(),
    birthday: elBirthday.value.trim(),
    courses: selectedCourses,
  };
}

async function loadTargetForEdit() {
  try {
    if (!id){
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
    if(id){
      console.log(id)
      
      const updated = readForm();
      const saved = await editOneTarget(id, updated, entity);
  
      currentObject = saved;
    }else{ // creating
      const newStd = readForm();
      const created = await addOneTarget(newStd, entity);
  
      currentObject = created;

    }
    window.location.href = `../../../FrontEndApplication/Html/studentsPage.html`;
  } catch (err) {
    console.error(err);
  }
});

loadTargetForEdit();
