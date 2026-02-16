export function validateObject(object) {
    if (!object.firstName || !object.lastName ||!object.gender  ||!object.birthday ){
        alert("Invalid Student Data , Please Fill the Form")
        throw new Error("Invalid Student Data , Please Fill the Form ");
    }
    if (!object.email || !validateEmail(object.email)){
        alert("Invalid Email , Please Enter a Valid E-Mail")
        throw new Error("A valid email is required.");

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
    if (object.courses && !Array.isArray(object.courses)){
        alert("You must Select at least one Course")
        throw new Error("Courses must be an array.");
    }
}
  
export function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

export function validatePhone(phone) {
    const phonePattern = /^\d{11}$/; // it must be 11 digit phone numbers
    return phonePattern.test(phone);
}
  
export function validateBirthday(birthday) {
    const birthdayPattern = /^([0-2][0-9]|(3)[0-1])\/([0][1-9]|1[0-2])\/\d{4}$/; //  it must be DD/MM/YYYY format
    return birthdayPattern.test(birthday)
}