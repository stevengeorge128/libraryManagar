async function checkSessionsForBookHash(username, hash, sessions, tempBookLookup) {
    let thisUser = sessions[username];
    if (thisUser== undefined){
        return false;
    } else{
        let hashes = thisUser["lookupHashes"];
        if (hashes.includes(hash)){
            let doc = await tempBookLookup.findOne({ "clientLookupHash": hash }).exec();
            if (doc == undefined){
                return false
            }
            return doc;
    
        } else{
            return false;
        }
    }



}



module.exports = {
    checkSessionsForBookHash
}