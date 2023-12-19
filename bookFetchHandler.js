async function parseBookSearch(title, author) {
    try {
        let gettingBook = await fetch(`https://openlibrary.org/search.json?title=${title}s`)
        if (gettingBook.ok) {
            let data = await gettingBook.json();
            let numFound = data.numFound;
            if (numFound > 0) {
                let firstDoc = data.docs[0];
                console.log(firstDoc)
                let title = firstDoc.title;
                let authorName = firstDoc.author_name;
                let isbn = firstDoc.isbn[0];
                let firstPublished = firstDoc.first_publish_year;
                let authorKey = firstDoc.author_key
                let extendedInfo = JSON.stringify(firstDoc);
                let subjects = firstDoc.subject_facet;
                let dewey = firstDoc.ddc_sort;
                let libCongress = firstDoc.lcc_sort;
                let thisInfo = {
                    title: title,
                    author: authorName,
                    isbn: isbn,
                    firstPublished: firstPublished,
                    authorKey: authorKey,
                    subjects: subjects,
                    dewey: dewey,
                    congress: libCongress,
                    extendedInfo: extendedInfo,
                    allDocs: data
                };
                return thisInfo;
            } else {
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
        const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);

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

module.exports = {
    parseBookSearch,
    getBookImageByIsbn
}