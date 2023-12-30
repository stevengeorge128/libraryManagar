const crypto = require("crypto")

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
    let hash = createClientLookupHash(title,authors, id)
    let thisInfo = {
        title: title,
        authors: authors,
        clientLookupHash: hash,
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


function createClientLookupHash(strA, strB, strC) {
    let rand = Math.floor((Math.random() * 1000) )
    let toHash = strA + strB + Date.now() + strC + rand
    let h = crypto.createHash('sha3-256');
    let data = h.update(toHash, 'utf-8');
    let hashResult = data.digest('hex');
    return hashResult

}