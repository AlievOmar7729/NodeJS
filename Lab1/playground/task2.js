const fs = require('fs');
fs.appendFile('./files/task02.txt', '\nHello World!', (err) => {
    if (err) {
        console.error("Помилка при додаванні до файлу:", err);
        return;
    }
    console.log("Рядок успішно додано до файлу.");
});