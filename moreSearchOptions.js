const { tempBookLookup } = require("./schemas")
const { createLookupInfo } = require("./createLookupInfo");


async function getOtherSearchResultsFromDoc(docID){
    let findingLookup = await tempBookLookup.findOne({"_id": docID});
    // console.log(JSON.parse(findingLookup.allDocs));
    
    let data = JSON.parse(findingLookup.allDocs);
    var userResponse = [];
    for (let i = 0; i < data.items.length; i++) {
        try {
            let doc = data.items[i];
            let thisInfo = createLookupInfo(doc, data);
            userResponse.push(thisInfo)
        }
        catch (err) {
            console.error(err)
        }
    }
    return userResponse

}


module.exports = {
    getOtherSearchResultsFromDoc
}