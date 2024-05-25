const os = require('os');
const userName = os.userInfo().username;
const greeting = `Hello, ${userName}!`;
console.log(greeting);