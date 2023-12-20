
function listenToSearchSubmit() {
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
                let id = response.coverId;
                let thisBookPrompt = document.getElementById("inputSearchResult");
                thisBookPrompt.innerHTML =
                    `<div id="thisTheBookPrompt">
            <div>Is this your book?</div>
            <ul>
                <li>Title: ${response.title}</li>
                <li>Author: ${response.authors}</li>
                <li>First Published: ${response.firstPublished}</li>
            </ul>
            </div>`;



                let thisBookImage = document.getElementById("rightSideResult");
                thisBookImage.innerHTML = response.imgSrc;

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
            let searching = await fetch(`http://localhost:5000/get/title/${bookTitle}`)
            if (searching.ok) {
                let response = await searching.json()
                window.alert("The Response is good")
                console.log(response)
            } else {
                window.alert("Fetch failed")
            }
        }



    }
}

window.onload = listenToSearchSubmit;