let loginEmailInput = document.querySelector("#loginEmailInput")
let loginPassInput = document.querySelector("#loginPassInput")
let loginbtn = document.querySelector("#loginbtn")
let nameInput = document.querySelector("#nameInput")
let signupEmailInput = document.querySelector("#signupEmailInput")
let signupPassInput = document.querySelector("#signupPassInput")
let signupBtn = document.querySelector("#signupBtn")
let alertSuccessSignup = document.querySelector("#alertSuccessSignup")
let alertFailedSignup = document.querySelector("#alertFailedSignup")
let link = document.querySelector("#link")
let alertSuccess = document.querySelector("#alertSuccess")
let alertFailed = document.querySelector("#alertFailed")
let wrongName = document.querySelector("#wrongName")
let wrongEmail = document.querySelector("#wrongEmail")
let wrongpass = document.querySelector("#wrongpass")
let welcomeMessage = document.getElementById("welcomeMessage");

/////////////////////////////////////////////SignUp
let usersList;
if (localStorage.getItem("usersList") == null) {
    usersList = [];
}
else {
    usersList = JSON.parse(localStorage.getItem("usersList"))
}

if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        if (validName() == true && validEmail() == true && validPass() == true) {
            let email = signupEmailInput.value.trim();
            wrongpass.classList.add("d-none")
            if (isEmailExists(email)) {
                alertFailedSignup.classList.remove("d-none")
                alertSuccessSignup.classList.add("d-none")
            } else {
                alertSuccessSignup.classList.remove("d-none")
                alertFailedSignup.classList.add("d-none")

                let user = {
                    username: nameInput.value,
                    email: email,
                    password: signupPassInput.value
                }
                usersList.push(user)
                localStorage.setItem("usersList", JSON.stringify(usersList))
            }
        }
        else if (validName() == false) {
            wrongName.classList.remove("d-none")
            wrongEmail.classList.add("d-none")
            wrongpass.classList.add("d-none")
        }
        else if (validEmail() == false) {
            wrongEmail.classList.remove("d-none")
            wrongName.classList.add("d-none")
            wrongpass.classList.add("d-none")
        }
        else if (validPass() == false) {
            wrongpass.classList.remove("d-none")
            wrongEmail.classList.add("d-none")
            wrongName.classList.add("d-none")
        }
    })
}

function validName() {
    let NameRegex = /^[A-Za-z]{3,}[0-9]{0,6}$/
    if (NameRegex.test(nameInput.value) == true) {
        return true
    } else {
        return false
    }
}

function validEmail() {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (emailRegex.test(signupEmailInput.value) == true) {
        return true
    } else {
        return false
    }
}

function validPass() {
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (passRegex.test(signupPassInput.value) == true) {
        return true
    } else {
        return false
    }
}
function isEmailExists(email) {
    let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email === email) {
            return true;
        }
    }
    return false;
}

if (nameInput) { nameInput.addEventListener("keyup", validName) }
if (signupBtn) { signupPassInput.addEventListener("keyup", validEmail) }
if (signupPassInput) { signupPassInput.addEventListener("keyup", validPass) }
///////////////////////////////////

//////////////////////////////////Login

if (loginbtn) {
    loginbtn.addEventListener("click", function () {
        email = loginEmailInput.value
        password = loginPassInput.value

        let usersList = JSON.parse(localStorage.getItem("usersList"))

        let userFound = false;
        let username = "";
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].email === email && usersList[i].password === password) {
                userFound = true;
                username = usersList[i].username;
                break;
            }
        }

        if (userFound) {
            localStorage.setItem("loggedInUser", username);
            alertSuccess.classList.remove("d-none")
            alertFailed.classList.add("d-none")
            window.location.href = "home.html";
        } else {
            alertFailed.classList.remove("d-none")
            alertSuccess.classList.add("d-none")
        }
    })
}
//////////////////////////////////

//////////////////////////////////Welcome
let loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    welcomeMessage.innerText = `Welcome, ${loggedInUser}!`;
}
//////////////////////////////////