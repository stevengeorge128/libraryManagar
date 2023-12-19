
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
        //if (bookAuthor == ""){
            let searching = await fetch(`http://localhost:5000/get/title/${bookTitle}`)
            if (searching.ok) {
                let response = await searching.json()
                //window.alert("The Response is good")
                //console.log(response  )

                let thisBookPrompt = document.getElementById("thisTheBookPrompt");
                thisBookPrompt.innerHTML = `
                <h2>Is this your book?</h2>
                <ul>
                    <li>Title: ${response.title}</li>
                    <li>Author: ${response.author}</li>
                    <li>First Published: ${response.firstPublished}</li>
                </ul>`

                window.alert("page updated")

            } else{
                window.alert("Fetch failed")
            }
        // }
        // // If only author
        // else if (bookTitle == "" ) {
        //     let searching = await fetch(`http://localhost:5000/get/title/${bookTitle}`)
        //     if (searching.ok) {
        //         let response = await searching.json()
        //         window.alert("The Response is good")
        //         console.log(response  )
        //     } else{
        //         window.alert("Fetch failed")
        //     }
        // }
        // // If both author and title
        // else{
        //     let searching = await fetch(`http://localhost:5000/get/title/${bookTitle}`)
        //     if (searching.ok) {
        //         let response = await searching.json()
        //         window.alert("The Response is good")
        //         console.log(response  )
        //     } else{
        //         window.alert("Fetch failed")
        //     }
        // }

    }


}

window.onload = listenToSearchSubmit;