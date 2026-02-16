export function validateStudentObject(object) {
    if (!object.firstName || !object.lastName ||!object.gender  ||!object.birthday ){
        alert("Invalid Student Data , Please Fill the Form")
        throw new Error("Invalid Student Data , Please Fill the Form ");
export function validateObject(object) {
    if (!object.firstName || !object.lastName  || !object.salary || !object.phone ||! object.role ||!object.birthday ){
        alert("Invalid Employee Data , Please Fill the Form")
        throw new Error("Invalid Employee Data , Please Fill the Form ");
    }
    if (!object.email || !validateEmail(object.email)){
        alert("Invalid Email , Please Enter a Valid E-Mail")
        throw new Error("A valid email is required.");

    }
    if (!object.phone || !validatePhone(object.phone)){
        alert("Invalid Phone number , Please Enter an 11 digit Phone number ")
        throw new Error("A valid Phone number is required.");

    }
    if (!object.birthday || !validateBirthday(object.birthday)){
        alert("Invalid Birthday , Please Enter Birthday in this Form DD/MM/YYYY ")
        throw new Error("A valid email is required.");

    }
    if (!object.role || !validateRole(object.role)){
        alert("Employee must be Instructor or employee")
        throw new Error("Employee must be Instructor or employee");
    }
}

export function validateCoursesObject(object) {
    if (!object.id || !object.courseName ||!object.instructorId ){
        alert("Invalid Course Data , Please Fill the Form")
        throw new Error("Invalid Course Data , Please Fill the Form ");
    }
}
  
export function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

export function validatePhone(phone) {
    const vaild  = /^\d{9,12}$/;// phone only have digit 0 to 9 and its size between 9 to 12
    return vaild.test(phone);
}
export function validateBirthday(birthday) {
    const birthdayPattern = /^([0-2][0-9]|(3)[0-1])\/([0][1-9]|1[0-2])\/\d{4}$/; //  it must be DD/MM/YYYY format
    return birthdayPattern.test(birthday)
}
export function validateRole(input){
    const vaild = /instructor|employee/;
    console.log(vaild.test(input));
    return vaild.test(input);
}
export function validateSalary(input){
    return input[0] === '£' && !isNaN(Number(input.substring(1)));
}