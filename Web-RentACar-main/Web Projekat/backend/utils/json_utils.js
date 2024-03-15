const fs = require('fs');

function jsonReader(filePath){
    try{
        const fileData = fs.readFileSync(filePath);
        return JSON.parse(fileData);
    }catch(error){
        console.error('Error reading files:', error);
        return [];
    }
}

const saveDataToFile = (data, path) => {
    const jsonString = JSON.stringify(data, null, 4);
    fs.writeFileSync(path, jsonString);
};

const generateNextId = (data) => {
    let maxId = 0;
    for(const item of data){
        if(item.id > maxId)
        {
            maxId = item.id;
        }
    }
    return maxId + 1;
};

module.exports = { jsonReader, saveDataToFile, generateNextId}