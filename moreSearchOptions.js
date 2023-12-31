const { tempBookLookup } = require("./schemas/tempBookLookupSchema")
const { createLookupInfo } = require("./createLookupInfo");


async function getOtherSearchResultsFromDoc(docID){
    let findingLookup = await tempBookLookup.findOne({"_id": docID});
    // console.log(JSON.parse(findingLookup.allDocs));
    
    let data = JSON.parse(findingLookup.allDocs);
    var userResponse = [];
    let hashes = [];

    for (let i = 0; i < data.items.length; i++) {
        try {
            let doc = data.items[i];
            let thisInfo = createLookupInfo(doc, data);
            let temp = new tempBookLookup(thisInfo);
            let savingTemp = await temp.save();
            userResponse.push(thisInfo)
            hashes.push(thisInfo.clientLookupHash)
        }
        catch (err) {
            console.error(err)
        }
    }
    return [userResponse, hashes]

}


module.exports = {
    getOtherSearchResultsFromDoc
}