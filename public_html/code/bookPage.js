var bookInfo = {};

async function loadPage() {
    console.log("loadPage is running");
    console.log(window.localStorage.getItem("lookupHash"));
    if (window.localStorage.getItem("lookupHash") == undefined) {
        window.alert("Failed to load book page. Please try again")
        window.location.href = "http://localhost:5000";
    }
    console.log(window.localStorage)
    let loading = await fetch("http://localhost:5000/post/loadBookPage", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "bookHash": window.localStorage.getItem("lookupHash") }),
        credentials: 'include', // Include credentials in the request
    });
    let response = await loading.json();
    convertServerResponseToHtml(response);
}

async function convertServerResponseToHtml(bookObj) {
    let title = bookObj.title;
    let authors = bookObj.authors;
    let isbn = bookObj.isbn;
    let publishedDate = bookObj.firstPublished;
    let imageLink = bookObj.imageLink;
    let imageHtml = bookObj.imageHtml;
    let extendedInfo = JSON.parse(bookObj.extendedInfo);
    console.log(imageLink)
    let publisher = extendedInfo.volumeInfo.publisher;
    let description = extendedInfo.volumeInfo.description;
    let googleLink = extendedInfo.volumeInfo.previewLink;

    let newRightHtml = `

    
    
    <table id="bookPageInitialInfoTable">


                <tr>
                    <td class="bookPageTableLeftColumn">TITLE:</td>
                    <td class="bookPageTableRightColumn">${title}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">AUTHORS:</td>
                    <td class="bookPageTableRightColumn">${authors}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">PUBLISHED:</td>
                    <td class="bookPageTableRightColumn">${publishedDate}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">PUBLISHER:</td>
                    <td class="bookPageTableRightColumn">${publisher}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">ISBN:</td>
                    <td class="bookPageTableRightColumn">${isbn}</td>
                </tr>
                <tr>
                <td class="bookPageTableLeftColumn">MORE:</td>
                <td class="bookPageTableRightColumn"><a href=${googleLink}>Google Books</a></td>
            </tr>

                <tr>
                    <td class="bookPageTableLeftColumn">DESCRIPTION: </td>
                    <td class="bookPageTableRightColumn" id = "descriptionTD">${description}</td>
                </tr>





            </table>`

    document.getElementById("bookPageInitialInfo").innerHTML = newRightHtml;

    let img = document.getElementById("bookPageImage")
    img.src = imageLink

}

async function seeMoreBookInfo() {
    console.log("seeMoreBookInfo")

}

async function authenticate() {
    console.log("authenticate on bookPage.js is being called")
    let auth = await fetch("http://localhost:5000/auth")
    if (auth.status == 401) {
        window.location.href = "http://localhost:5000/html/login.html";
    }
}


function backToBookSearch() {
    window.location.href = "http://localhost:5000/";
}
window.onload = loadPage;
// window.onload = authenticate;
setInterval(authenticate, 5000)