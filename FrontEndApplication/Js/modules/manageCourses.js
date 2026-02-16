import { getDataFromServer, getOneTarget, editOneTarget, addOneTarget }
  from "./getDataFromServer.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const entity = "courses";

const form = document.getElementById("editForm");

const elId = document.getElementById("id");
const elCourseName = document.getElementById("courseName");
const instructorsBox = document.getElementById("instructorsBox");

let currentObject = null;



async function renderInstructorCheckboxes(selected = null) {
  instructorsBox.innerHTML = "";

  const employees = await getDataFromServer("http://localhost:3000/employees");

  const instructors = employees.filter(emp => emp.role === "instructor");

  instructors.forEach(inst => {

    const label = document.createElement("label");
    label.className = "data-label";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = inst.id;
    cb.className = "dataCheck";

    // pre-check current instructor
    if (selected && Number(selected) === Number(inst.id)) {
      cb.checked = true;
    }

    // allow only ONE checkbox selected
    cb.addEventListener("change", function () {
      if (this.checked) {
        document
          .querySelectorAll(".instructorCheck")
          .forEach(box => {
            if (box !== this) box.checked = false;
          });
      }
    });

    const text = document.createElement("span");
    text.textContent = `${inst.firstName} ${inst.lastName}`;

    label.appendChild(cb);
    label.appendChild(text);
    instructorsBox.appendChild(label);
  });
}


function fillForm(course) {
  elId.value = course.id ?? "";
  elCourseName.value = course.courseName ?? "";

  renderInstructorCheckboxes(course.instructorId ?? null);
}


function readForm() {

  const selectedInstructor = document.querySelector(
    ".dataCheck:checked"
  );

  // validation
  if (!elCourseName.value.trim()) {
    alert("Course name is required.");
    return null;
  }

  if (!selectedInstructor) {
    alert("Please select one instructor.");
    return null;
  }

  return {
    ...currentObject,
    courseName: elCourseName.value.trim(),
    instructorId: Number(selectedInstructor.value)
  };
}


async function loadTargetForEdit() {
  try {
    if (!id) {
      fillForm({});
      return;
    }

    const target = await getOneTarget(id, entity);
    if (!target) throw new Error("Course not found");

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
      if (!updated) return;

      const saved = await editOneTarget(id, updated, entity);
      currentObject = saved;

    } else {
      const newCourse = readForm();
      if (!newCourse) return;

      const created = await addOneTarget(newCourse, entity);
      currentObject = created;
    }

    window.location.href =
      `../../../FrontEndApplication/Html/coursesPage.html`;

  } catch (err) {
    console.error(err);
  }
});


loadTargetForEdit();
