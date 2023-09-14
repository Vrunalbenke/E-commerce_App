function EmailValidator(email:string):boolean{
    const emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email)
}
function NameValidator(name:string):boolean{
    const nameRegex:RegExp = /^[A-Za-z\s'-]+$/;
    return nameRegex.test(name)
}
function PhoneValidator(PhoneNo:string):boolean{
    const phoneRegex:RegExp = /^\d{10}$/;
    return (phoneRegex.test(PhoneNo))
}
function PasswordValidator(Password:string):boolean{
    const passwordRegex:RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~]{8,}$/;
    return passwordRegex.test(Password)
}




export {EmailValidator, NameValidator, PhoneValidator, PasswordValidator} 