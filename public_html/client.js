
function indexEventListeners() {
    document.getElementById("submitBookSearch").addEventListener("click", bookSearch);
}



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
                response.imgSrc + 
                '<div id = "yesNoDiv"> <input class = "yesNoTitleSearch" type="submit" id="titleSearchIsTheBook" onclick="yesToTitleSearch()" value="YES">' + 
                '<input class = "yesNoTitleSearch" type="submit" id="titleSearchIsNotTheBook" onclick="noToTitleSearch()" value="NO"></div>';

            } else {
                window.alert("Fetch failed");
            }


            // If only author
        } else if (bookTitle == "") {
            let searching = await fetch(`http://localhost:5000/get/author/${bookAuthor}`)
            if (searching.ok) {
                let response = await searching.json()
                let newHtml = '<div class = "authorSearchResultDiv">'
                let length = response.length
                // console.log(response)
                let j = 1
                let thisBookPrompt = document.getElementById("inputSearchResult");
                thisBookPrompt.innerHTML = "";
                for (let i = 0; i < length; i++) {
                    //if ((response[i].title != response[0].title) && (response[i].authors != response[0].authors) && (response[i].firstPublished != response[0].firstPublished) && (response[i].imgSrc != response[0].imgSrc)) {
                    newHtml += `
                            <div>Book ${j}</div>
                            <ul>
                                <li>Title: ${response[i].title}</li>
                                <li>Author: ${response[i].authors}</li>
                                <li>First Published: ${response[i].firstPublished}</li>
                                ${response[i].imgSrc}
                            </ul>
                            `
                    j++;
                    //}



                }
                let toUpdate = document.getElementById("rightSideResult");
                newHtml += "</div>"
                toUpdate.innerHTML = newHtml;
            } else {
                window.alert("Fetch failed")


            }
        }
        // If both author and title
        else {
            let searching = await fetch(`http://localhost:5000/get/authAndTitle/${bookTitle}/${bookAuthor}`)
            if (searching.ok) {

                let response = await searching.json()
                let id = response.coverId;
                let thisBookPrompt = document.getElementById("inputSearchResult");
                thisBookPrompt.innerHTML =
                    `<div id="thisTheBookPrompt">
                    <ul>
                        <li>Title: ${response.title}</li>
                        <li>Author: ${response.authors}</li>
                        <li>First Published: ${response.firstPublished}</li>
                    </ul>
                    </div>`;



                let thisBookImage = document.getElementById("rightSideResult");
                thisBookImage.innerHTML = "<div>Is this your book?</div>" + response.imgSrc;
            } else {
                window.alert("Fetch failed")
            }
        }



    }
}

function yesToTitleSearch() {
    console.log("YES")

}

function noToTitleSearch() {
    console.log("NO")

}

window.onload = indexEventListeners;