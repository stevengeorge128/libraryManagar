async function login(usernameID, passwordID, responseID) {


    var username = document.getElementById(usernameID).value;
    var password = document.getElementById(passwordID).value;
    console.log(username)
    console.log(password)

    let loggingIn = await fetch("http://localhost:5000/login")

    let response = await loggingIn.text();
    console.log(response)
    window.location.href = "http://localhost:5000/"
}


async function createLogin(usernameID, passwordID, responseID){
    var username = document.getElementById(usernameID).value;
    var password = document.getElementById(passwordID).value;
    console.log(username)
    console.log(password)


}