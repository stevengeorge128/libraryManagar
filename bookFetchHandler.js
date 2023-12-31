const { createLookupInfo } = require("./createLookupInfo");

async function parseBookTitleSearch(title) {
    try {
        let gettingBookFromGoogle = await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:" + title)

        if (gettingBookFromGoogle.ok) {
            let data = await gettingBookFromGoogle.json();
            let numFound = data.totalItems;
            if (numFound > 0) {
                let doc = data.items[0];
                let thisInfo = createLookupInfo(doc, data);

                
                return thisInfo
            } else {
                return false
            }
            return false;
        }
    } catch (error) {
        console.log(error)
        console.error("error in fetching book");
        return false;
    }
}

async function getBookImageByIsbn(isbn) {
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
    let gettingAuthorFromGoogle = await fetch("https://www.googleapis.com/books/v1/volumes?q=inauthor:" + author)
    if (gettingAuthorFromGoogle.ok) {
        let data = await gettingAuthorFromGoogle.json();
        let numFound = data.totalItems;
        var userResponse = [];
        let hashes = [];
        if (numFound > 0) {
            for (let i = 0; i < data.items.length; i++) {
                try {
                    let doc = data.items[i];
                    let thisInfo = createLookupInfo(doc, data);
                    userResponse.push(thisInfo)
                    hashes.push(thisInfo.clientLookupHash)
                }
                catch (err) {
                    console.error(err)
                }
            }
            return [userResponse, hashes]
        }
        return data;
    } else {
        return false;
    }

}



async function parseTitleAndAuthorSearch(title, author) {
    try {
        console.log("CHECKING GOOGLE BOOKS API TITLE AND AUTHOR SEARCH")
        let gettingBookFromGoogle = await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:" + title + "+inauthor:" + author);
        if (gettingBookFromGoogle.ok) {
            let data = await gettingBookFromGoogle.json();
            let numFound = data.totalItems;
            if (numFound > 0) {
                let doc = data.items[0];
                let thisInfo = createLookupInfo(doc, data);
                return thisInfo
            } else {
                return false
            }
            return false;
            // }
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