async function parseBookTitleSearch(title) {
    try {
        let gettingBookFromOpenLib = await fetch(`https://openlibrary.org/search.json?title=${title}`)
        if (gettingBookFromOpenLib.ok) {
            let data = await gettingBookFromOpenLib.json();
            let numFound = data.numFound;
            //console.log(data)

            if (numFound > 0) {
                console.log("OPEN LIB HAS THE BOOK")
                let firstDoc = data.docs[0];
                console.log(firstDoc)
                let title = firstDoc.title;
                let authorName = firstDoc.author_name;
                let isbn = firstDoc.isbn[0];
                let coverId = firstDoc.cover_i;
                let firstPublished = firstDoc.first_publish_year;
                let authorKey = firstDoc.author_key
                let extendedInfo = JSON.stringify(firstDoc);
                let subjects = firstDoc.subject_facet;
                let dewey = firstDoc.ddc_sort;
                let libCongress = firstDoc.lcc_sort;
                let allDocs = JSON.stringify(data);
                let thisInfo = {
                    title: title,
                    authors: authorName,
                    isbn: isbn,
                    coverIdOpenLib: coverId,
                    firstPublished: firstPublished,
                    authorKeyOpenLib: authorKey,
                    subjectsOpenLib: subjects,
                    imgSrc: `<img id = "searchResultImage" src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="background image"> `,
                    dewey: dewey,
                    congress: libCongress,
                    extendedInfo: extendedInfo,
                    allDocs: allDocs
                };
                return thisInfo;
            } else {
                console.log("CHECKING GOOGLE BOOKS API")
                let gettingBookFromGoogle = await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:" + title)

                if (gettingBookFromGoogle.ok){
                    let data = await gettingBookFromGoogle.json();
                    let numFound = data.totalItems;
                    //console.log(data)
        
                    if (numFound > 0) {
                        //console.log(data)
                        let firstDoc = data.items[0];
                        //console.log(data)
                       // console.log(firstDoc)
                        console.log(firstDoc.volumeInfo)
    
                        let title = firstDoc.volumeInfo.title;
                        let authors = firstDoc.volumeInfo.authors;
                        let isbn = firstDoc.volumeInfo.industryIdentifiers[0].identifier;
                        let coverId = undefined;
                        let firstPublished = firstDoc.volumeInfo.publishedDate;
                        let authorKey = undefined;
                        let subjects = undefined;
                        let dewey = undefined;
                        let libCongress = undefined;
                        let extendedInfo = JSON.stringify(firstDoc);
                        let allDocs = JSON.stringify(data);
                        let imgLink = firstDoc.volumeInfo.imageLinks.thumbnail + "&fife=w800"
    
                        let thisInfo = {
                            title: title,
                            authors: authors,
                            isbn: isbn,
                            coverIdOpenLib: coverId,
                            firstPublished: firstPublished,
                            authorKeyOpenLib: authorKey,
                            subjectsOpenLib: subjects,
                            imgSrc: `<img id = "searchResultImage" src="${imgLink}" alt="background image"> `,
                            dewey: dewey,
                            congress: libCongress,
                            extendedInfo: extendedInfo,
                            allDocs: allDocs
                        };
                        return thisInfo
                    } else{
                        return false
                    }

                   
                }

                return false;
            }
        }
    } catch (error) {
        console.log(error)
        console.error("error in fetching book");
        return false;
    }
}

async function getBookImageByIsbn(isbn){
    try {
        const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);

        if (!response.ok) {
            throw new Error('Failed to fetch book cover');
        }

        const imageBuffer = Buffer.from(await response.arrayBuffer());

        return imageBuffer;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Rethrow the error to be caught by the caller
    }

}

async function parseBookAuthorSearch(author) {
    let gettingBookFromOpenLib = await fetch(`https://openlibrary.org/search.json?author=${author}`)
    if (gettingBookFromOpenLib.ok) {
        let data = await gettingBookFromOpenLib.json();
        //console.log(data.docs[0]);
        let numFound = data.numFound;
        console.log(data)
        var userResponse = [];
        if (numFound > 0) { 
            for (let i = 0; i < data.docs.length; i ++ ){
                let doc = data.docs[i];
                console.log("_______________________________ \n " + i + " \n")
                console.log(doc)
                try{

                
                let title = doc.title;
                let authorName = doc.author_name;
                let isbn = doc.isbn[0];
                let coverId = doc.cover_i;
                let firstPublished = doc.first_publish_year;
                let authorKey = doc.author_key
                let editionKeyOpenLib = doc.editionKey;
                let extendedInfo = JSON.stringify(doc);
                let subjects = doc.subject_facet;
                let dewey = doc.ddc_sort;
                let libCongress = doc.lcc_sort;
                let allDocs = JSON.stringify(data);
                let thisInfo = {
                    title: title,
                    authors: authorName,
                    isbn: isbn,
                    coverIdOpenLib: coverId,
                    firstPublished: firstPublished,
                    authorKeyOpenLib: authorKey,
                    subjectsOpenLib: subjects,
                    editionKeyOpenLib: editionKeyOpenLib,
                    imgSrc: `<img class = "authorSearchResultImage" src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="background image"> `,
                    dewey: dewey,
                    congress: libCongress,
                };
                userResponse.push(thisInfo)
            }
            catch(err) {
                console.error(err)
            }

            }
            return userResponse

        }


        return data;
    } else{
        return false;
    }

}


async function parseTitleAndAuthorSearch(title, author){
    try {
        let gettingBookFromOpenLib = await fetch(`https://openlibrary.org/search.json?title=${title}&author=${author}`)
        if (gettingBookFromOpenLib.ok) {
            let data = await gettingBookFromOpenLib.json();
            let numFound = data.numFound;
            //console.log(data)

            if (numFound > 0) {
                console.log("OPEN LIB HAS THE BOOK")
                let firstDoc = data.docs[0];
                console.log(firstDoc)
                let title = firstDoc.title;
                let authorName = firstDoc.author_name;
                let isbn = firstDoc.isbn[0];
                let coverId = firstDoc.cover_i;
                let firstPublished = firstDoc.first_publish_year;
                let authorKey = firstDoc.author_key
                let extendedInfo = JSON.stringify(firstDoc);
                let subjects = firstDoc.subject_facet;
                let dewey = firstDoc.ddc_sort;
                let libCongress = firstDoc.lcc_sort;
                let allDocs = JSON.stringify(data);
                let thisInfo = {
                    title: title,
                    authors: authorName,
                    isbn: isbn,
                    coverIdOpenLib: coverId,
                    firstPublished: firstPublished,
                    authorKeyOpenLib: authorKey,
                    subjectsOpenLib: subjects,
                    imgSrc: `<img id = "searchResultImage" src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="background image"> `,
                    dewey: dewey,
                    congress: libCongress,
                    extendedInfo: extendedInfo,
                    allDocs: allDocs
                };
                return thisInfo;
            } else {
                console.log("CHECKING GOOGLE BOOKS API")
                let gettingBookFromGoogle = await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:" + title)

                if (gettingBookFromGoogle.ok){
                    let data = await gettingBookFromGoogle.json();
                    let numFound = data.totalItems;
                    //console.log(data)
        
                    if (numFound > 0) {
                        //console.log(data)
                        let firstDoc = data.items[0];
                        //console.log(data)
                       // console.log(firstDoc)
                        console.log(firstDoc.volumeInfo)
    
                        let title = firstDoc.volumeInfo.title;
                        let authors = firstDoc.volumeInfo.authors;
                        let isbn = firstDoc.volumeInfo.industryIdentifiers[0].identifier;
                        let coverId = undefined;
                        let firstPublished = firstDoc.volumeInfo.publishedDate;
                        let authorKey = undefined;
                        let subjects = undefined;
                        let dewey = undefined;
                        let libCongress = undefined;
                        let extendedInfo = JSON.stringify(firstDoc);
                        let allDocs = JSON.stringify(data);
                        let imgLink = firstDoc.volumeInfo.imageLinks.thumbnail + "&fife=w800"
    
                        let thisInfo = {
                            title: title,
                            authors: authors,
                            isbn: isbn,
                            coverIdOpenLib: coverId,
                            firstPublished: firstPublished,
                            authorKeyOpenLib: authorKey,
                            subjectsOpenLib: subjects,
                            imgSrc: `<img id = "searchResultImage" src="${imgLink}" alt="background image"> `,
                            dewey: dewey,
                            congress: libCongress,
                            extendedInfo: extendedInfo,
                            allDocs: allDocs
                        };
                        return thisInfo
                    } else{
                        return false
                    }

                   
                }

                return false;
            }
        }
    } catch (error) {
        console.log(error)
        console.error("error in fetching book");
        return false;
    }
}


module.exports = {
    parseBookTitleSearch,
    parseBookAuthorSearch,
    parseTitleAndAuthorSearch,
    getBookImageByIsbn
}