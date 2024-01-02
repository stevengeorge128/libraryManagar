function libraryItem(value) {
    console.log("list item selected " , value)
}



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
    authenticate();
    } catch{
        window.alert("Error logging out. Please try again.")
    }

}

async function authenticate() {
    let auth = await fetch("http://localhost:5000/auth")
    if (auth.status == 401){
        window.location.href = "http://localhost:5000/html/login.html";
    }
}

async function loadPage() {
    authenticate();
    document.getElementById("libraryHeaderButton").addEventListener("click", toLibraryList);
    document.getElementById("searchHeaderButton").addEventListener("click", toBookSearch);
    document.getElementById("logOutHeaderButton").addEventListener("click", logOut);

}