function parseBookSearch(bookData){
    let numFound = bookData.numFound;
    if (numFound > 0){
        let firstDoc = bookData.docs[0];
        let title = firstDoc.title;
        let authorName = firstDoc.author_name;
        let isbn = firstDoc.isbn[0];
        let firstPublished = firstDoc.first_publish_year;
        let authorKey = firstDoc.author_key
        let contributors = firstDoc.contributors
        let extendedInfo = JSON.stringify(firstDoc);
        let thisInfo = {
            title: title,
            author: authorName,
            isbn: isbn,
            firstPublished: firstPublished,
            authorKey: authorKey,
            contributors: contributors,

            extendedInfo: extendedInfo
        }
        
        //  https://covers.openlibrary.org/b/isbn/9780141311876-M.jpg

        return thisInfo;
    } else{
        return false;
    }

}

module.exports = {
    parseBookSearch,
}