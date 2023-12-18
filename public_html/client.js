
function listenToSearchSubmit(){
    document.getElementById("submitBookSearch").addEventListener("click", bookSearch); 
}

async function bookSearch() {
    let bookTitle = document.getElementById("bookSearchInput").value;
    let bookAuthor = document.getElementById("authorInput").value;
    bookTitle = bookTitle.split(" ").join("+");
    bookAuthor = bookAuthor.split(" ").join("+");

    let searching = await fetch(`http://localhost:5000/get/${bookTitle}/${bookAuthor}`)
    if (searching.ok) {
        let response = await searching.json()
        window.alert("The Response is good")
        console.log(response  )
    } else{
        window.alert("Fetch failed")
    }



}

window.onload = listenToSearchSubmit;