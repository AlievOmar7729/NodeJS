const fs = require('fs')
const getUser = () => {
    try{
        const json = fs.readFileSync(`${__dirname}/user.json`, 'utf-8')
        return JSON.parse(json)
    }
    catch(error){
        console.error("Error:", error);
        return null;
    }
}
const saveUser = (user) => {
    try {
        fs.writeFileSync(`${__dirname}/user.json`, JSON.stringify(user, null, 2));
        console.log("User's data saved successfully.");
    } catch (error) {
        console.error("Error:", error);
    }
};
function addLanguage(language) {
    const user = getUser()
    if(user){
        user.languages.push(language)
        saveUser(user);
    }
}
function removeLanguage(langName) {
    const user = getUser()
    if(user){
        let index = -1;
        for(let i = 0; i < user.languages.length; i++) {
            if (user.languages[i].title === langName) {
                index = i;
            }
        }
        if (index !== -1) {
            user.languages.splice(index, 1);
            saveUser(user);
        }
    }
}
const getLanguages = () => {
    const user=getUser();
    if(user)
        return user.languages
}
const findLanguage = (langName) => {
    const user = getUser()
    if(user){
        const language = user.languages.find(lang => lang.title === langName)
        if (language) {
            return language;
        }
        return "No language with this name was found"
    }
}
module.exports = {addLanguage, removeLanguage, getLanguages, findLanguage}