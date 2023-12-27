function createLookupInfo(doc, data) {
    let title = doc.volumeInfo.title;
    let authors = doc.volumeInfo.authors;
    let id = doc.id;
    let link = doc.volumeInfo.selfLink;
    let isbn = doc.volumeInfo.industryIdentifiers[0].identifier;
    let firstPublished = doc.volumeInfo.publishedDate;
    let extendedInfo = JSON.stringify(doc);
    let allDocs = JSON.stringify(data);
    let imgLink = doc.volumeInfo.imageLinks.thumbnail + "&fife=w800";
    let thisInfo = {
        title: title,
        authors: authors,
        clientLookupHash: "xxx",
        googleID: id,
        link: link,
        isbn: isbn,
        firstPublished: firstPublished,
        imageLink: imgLink,
        imageHtml: `<img id = "searchResultImage" src="${imgLink}" alt="background image"> `,
        extendedInfo: extendedInfo,
        allDocs: allDocs
    };
    return thisInfo;
}
exports.createLookupInfo = createLookupInfo;
