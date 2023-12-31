const authorizer = require('./authenticate');



function toLibraryList(){
    window.location.href = "http://localhost:5000/html/libraryListPage.html";
}

function toBookSearch() {
    window.location.href = "http://localhost:5000/";

}

async function logOut() {
    console.log(document.cookie)
    try{
    let loggingOut = await fetch("http://localhost:5000/logout");
    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie)
    authorizer.authenticate();
    } catch{
        window.alert("Error logging out. Please try again.")
    }

}

module.exports = {
    toLibraryList,
    toBookSearch,
    logOut,
}