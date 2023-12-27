
function indexEventListeners() {
    document.getElementById("submitBookSearch").addEventListener("click", bookSearch);
}

var bookListInfo = [];

async function bookSearch() {
    let bookTitle = document.getElementById("bookSearchInput").value;
    let bookAuthor = document.getElementById("authorInput").value;
    bookTitle = bookTitle.split(" ").join("+");
    bookAuthor = bookAuthor.split(" ").join("+");

    if (bookAuthor == "" && bookTitle == "") {
        window.alert("Please fill out at least one field")
    } else {
        // If only title
        if (bookAuthor == "") {
            let searching = await fetch(`http://localhost:5000/get/title/${bookTitle}`)
            if (searching.ok) {
                let response = await searching.json()
                let docId = response[1]
                window.localStorage.setItem("currentTitleLookup", docId);
                response = response[0]
                let id = response.coverId;
                let thisBookPrompt = document.getElementById("inputSearchResult");
                thisBookPrompt.innerHTML =
                    `<div id="thisTheBookPrompt">
                    <ul>
                        <li>Title: ${response.title}</li>
                        <li>Author: ${response.authors}</li>
                        <li>First Published: ${response.firstPublished}</li>
                    </ul>
                    </div>

            
            `;
                let thisBookImage = document.getElementById("rightSideResult");
                thisBookImage.innerHTML = '<div>Is this your book?</div>' +
                    response.imageHtml +
                    '<div id = "yesNoDiv"> <input class = "yesNoTitleSearch" type="submit" id="titleSearchIsTheBook" onclick="yesToTitleAndOrAuthorSearch()" value="YES">' +
                    '<input class = "yesNoTitleSearch" type="submit" id="titleSearchIsNotTheBook" onclick="noToTitleAndOrAuthorSearch()" value="NO"></div>';

            } else {
                window.alert("Fetch failed");
            }


            // If only author
        } else if (bookTitle == "") {
            let searching = await fetch(`http://localhost:5000/get/author/${bookAuthor}`)
            await handleBookListResponse(searching);
        }
        // If both author and title
        else {
            let searching = await fetch(`http://localhost:5000/get/authAndTitle/${bookTitle}/${bookAuthor}`)
            if (searching.ok) {
                let response = await searching.json()
                let id = response.coverId;
                let thisBookPrompt = document.getElementById("inputSearchResult");
                let docId = response[1]
                window.localStorage.setItem("currentTitleLookup", docId);
                response = response[0]
                thisBookPrompt.innerHTML =
                    `<div id="thisTheBookPrompt">
                    <ul>
                        <li>Title: ${response.title}</li>
                        <li>Author: ${response.authors}</li>
                        <li>First Published: ${response.firstPublished}</li>
                    </ul>
                    </div>`;
                let thisBookImage = document.getElementById("rightSideResult");
                thisBookImage.innerHTML = '<div>Is this your book?</div>' +
                    response.imageHtml +
                    '<div id = "yesNoDiv"> <input class = "yesNoTitleSearch" type="submit" id="titleSearchIsTheBook" onclick="yesToTitleAndOrAuthorSearch()" value="YES">' +
                    '<input class = "yesNoTitleSearch" type="submit" id="titleSearchIsNotTheBook" onclick="noToTitleAndOrAuthorSearch()" value="NO"></div>';
            } else {
                window.alert("Fetch failed")
            }
        }



    }
}

async function handleBookListResponse(searching) {
    if (searching.ok) {
        let response = await searching.json();
        let newHtml = '<div class = "authorSearchResultDiv">';
        let length = response.length;
        let j = 1;
        let thisBookPrompt = document.getElementById("inputSearchResult");
        thisBookPrompt.innerHTML = "";
        for (let i = 0; i < length; i++) {
            //console.log(response[i]);
            bookListInfo = response;
            newHtml += `
            <div class = "singleBookInResultList" onclick="selectThisBook(${i})">
                            <div>Book ${j}</div>
                            <ul class = "bookListUL">
                                <li>Title: ${response[i].title}</li>
                                <li>Author: ${response[i].authors}</li>
                                <li>First Published: ${response[i].firstPublished}</li>
                                ${response[i].imageHtml}
                            </ul>
            </div>
                            `;
            j++;
        }
        let toUpdate = document.getElementById("rightSideResult");
        newHtml += "</div>";
        toUpdate.innerHTML = newHtml;
    } else {
        window.alert("Fetch failed");


    }
}

function yesToTitleAndOrAuthorSearch() {
    console.log("YES")
    console.log(window.localStorage)

}

async function noToTitleAndOrAuthorSearch() {
    console.log("NO");
    console.log(window.localStorage);
    let lookup = window.localStorage.getItem("currentTitleLookup");
    if (lookup == undefined) {
        window.alert("local storage undefined");
    } else {

        let result = await fetch("http://localhost:5000/post/notTitleAndOrAuthResult", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "tempLookup": lookup }),
            credentials: 'include', // Include credentials in the request
        });

        await handleBookListResponse(result);



    }



}

function selectThisBook(index){
    console.log("bookSelected")
    console.log(index);
    console.log(bookListInfo[index])

}

window.onload = indexEventListeners;