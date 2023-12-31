async function authenticate() {
    let auth = await fetch("http://localhost:5000/auth")
    if (auth.status == 401){
        window.location.href = "http://localhost:5000/html/login.html";
    }
}

module.exports = {
    authenticate,
}