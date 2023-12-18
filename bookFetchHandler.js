async function parseBookSearch(title, author){
    console.log("inside parseBookSearch")

    try{
    let gettingBook = await fetch("https://openlibrary.org/search.json?title=quantum+field+theory&author=Ryder")
    console.log(gettingBook)
    if (gettingBook.ok) {
        console.log("inside gettingBook okay")
        let data = await gettingBook.json();

        let numFound = data.numFound;
        if (numFound > 0){
            let firstDoc = data.docs[0];
            console.log(firstDoc)
    
            let title = firstDoc.title;
            let authorName = firstDoc.author_name;
            let isbn = firstDoc.isbn[0];
            let firstPublished = firstDoc.first_publish_year;
            let authorKey = firstDoc.author_key
            let contributors = firstDoc.contributors
            let extendedInfo = JSON.stringify(firstDoc);
            let subjects = firstDoc.subject_facet;
            let thisInfo = {
                title: title,
                author: authorName,
                isbn: isbn,
                firstPublished: firstPublished,
                authorKey: authorKey,
                contributors: contributors,
                subjects: subjects,
                extendedInfo: extendedInfo
            };
            
            //  https://covers.openlibrary.org/b/isbn/9780141311876-M.jpg
    
            return thisInfo;
        } else{
            return false;

      
      }


   
    }}catch (error) {
        console.log(error)
        console.error("error in fetching book");
        return false;
    }

}

module.exports = {
    parseBookSearch,
}