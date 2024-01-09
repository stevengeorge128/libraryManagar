function libraryItem(value) {
    console.log("list item selected " , value)
}



function toLibraryList(){
    window.location.href = "http://localhost:5000/html/libraryListPage.html";
}

function toBookSearch() {
    window.location.href = "http://localhost:5000/";

}

function newLibrary(){
    console.log("new library")
    document.getElementById("centerAreaLibraryListPage").innerHTML = `<div id="labelColumn">
    <div id="nameInputLabel" class="newLibraryLabelClass" for="nameInput">Name:</div>
    <div id="locationInputLabel" class="newLibraryLabelClass" for="locationInput">Location</div>
    <div id="descriptionInputLabel" class="newLibraryLabelClass" for="descriptionInput">
        Description</div>
</div>

<div id="inputColumn">
    <input id="nameInput" class="newLibraryInputClass" type="text">
    <input id="locationInput" class="newLibraryInputClass" type="text">
    <textarea name="newLibraryDescriptionTextArea" class="newLibraryInputClass" id="descriptionInput"></textarea>


</div>

    <button id="newLibraryCreateButton" class="newLibraryFormClass">CREATE</button>`;
    // document.getElementById("centerAreaLibraryListPage").style = "position: fixed;top: 27%;height: 60%; overflow: scroll; width: 40%;border-radius:5px;left: 30%;list-style-type: none;padding: 0;margin: 0;background-color: #c5c6c75f;font-family: 'Courier New', Courier, monospace;color: #66FCF1;    margin-top: 10px;    font-size: 30px;"
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
    document.getElementById("newLibraryButton").addEventListener("click", newLibrary);



}

window.onload = loadPage;