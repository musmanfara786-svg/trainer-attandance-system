// Save data
function saveData(key, data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


// Get data
function getData(key){

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


// Remove data
function removeData(key){

    localStorage.removeItem(key);

}


// Generate unique ID

function generateID(prefix){

    return prefix + Date.now();

}