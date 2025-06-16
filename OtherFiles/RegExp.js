// 1):
// const text = 'Hello World1234+';
//
// const regexp = /[a-z]+/ig;
// const regexp = /[^0-9]+/ig;
// const regexp = /\w+/g;
// const regexp = /\d+/g;
// const regexp = /(?<=\s)[a-z]+(?:[a-z])/i;

// 2):
// const text = '<@Danya/>Hey Team. I would like to have a call with <@Dima123/> at 14:00. <@John/> would you join us?';
//
// const regexp = /(?<=@)\w+(?=\/)/g;
// const regexp = /(?<=<@)\w+/g;

// // 3):
// const text = '<@Danya/>Hey Team. I citykyiv@gmail.com would like to have test@icloud.ua a call with my.email-123@sub.domain.com <@Dima123/> at 14:00. <@John/> would you join us?';
//
// const regexp = /[\w.-]+@[\w.-]+\.[a-z]{2,12}/g;

// 4):
// const text = '<@Danya/>Hey Team. I +380664531331 citykyiv@gmail.com +38 (066) 453-13-31 would like 38 (066) 453-13-31 to have test@icloud.ua a call with my.email-123@sub.domain.com <@Dima123/> at 14:00. <@John/> would you join us?';
//
// const regexp = /(\+?)\d+[0-9\-)(\s]{10,16}(?:\d)/g;

// 5):
// const text = 'MESS1KXD6549CA CALL1KXD6549USMESS6ZPP0V3LUS, CALLPZDE12S4US, MESSKXS49D16US'
//
// const regexp = /(mess|call)\w{8}(ca|us)/ig;

// 6):
// const text = 'citykyiv@kompas.travel';
//
// const regexp = /^[\w]+@[\w.]+\.[a-z]{2,12}$/

// 7):
// const text = 'https://www.youtube.com';
//
// const regexp = /^http(s?):\/\/[\w.\-]+\.[a-z]{2,12}$/g;

// Особисті завдання (1):
const text1 = "Напишіть на info@example.com або support123@service.org, а також перевірте admin@localhost.";

const result1 = text1.match(/[\w.\-]+@[\w.\-]+(?:\.[a-z]{0,12})?\b/g);
console.log(result1); // Очікується: ['info@example.com', 'support123@service.org', 'admin@localhost']

// Особисті завдання (2):
const text2 = "У мене є 3 яблука, 15 бананів і 1000 гривень.";

const result2 = text2.match(/\d+/g);
console.log(result2); // Очікується: ['3', '15', '1000']

// Особисті завдання (3):
const text3 = "Привіт <@John123/>, поговори з <@Anna/> і <@Dima_01/>";

const result3 = text3.match(/<@\w+\/>/g);
console.log(result3); // Очікується: ['<@John123/>', '<@Anna/>', '<@Dima_01/>']

// Особисті завдання (4):
const text4 = "Це #тестовий пост з #хештегами, перевірка #Regex_101! #";

const result4 = text4.match(/#[\wа-яА-ЯіІїЇєЄґҐ]+/gu);
console.log(result4); // Очікується: ['#тестовий', '#хештегами', '#Regex_101']

// Особисті завдання (5):
const text5 = "Hello world. This is a Test. Let's Meet at Main Street I.";

const result5 = text5.match(/[A-Z][a-z]+/g);
console.log(result5); // Очікується: ['Hello', 'This', 'Test', 'Let', 'Meet', 'Main', 'Street']


// Особисті завдання (6):
const text6 = "Мій номер +380501234567, а ще є запасний 063-123-45-67 і 380991234567. Є ще якийсь 1234567 — але це не номер.";

const result6 = text6.match(/(\+380|380|0)+\d{2}\-?\d{3}\-?\d{2}\-?\d{2}/g);
console.log(result6); // Очікується: ['+380501234567', '063-123-45-67', '380991234567']

// Особисті завдання (7):
const text7 = "Книга коштує 300 грн, блокнот — 49.99грн, а ручка - 15 грн. Це не ціна: 500 доларів.";

const result7 = text7.match(/\d+([.,]\d+)?\s?грн/g);
console.log(result7); // Очікується: ['300 грн', '49.99грн', '15 грн']

// Особисті завдання (8):
const text8 = "Зайди на https://example.com, також дивись http://test.org або www.something.net і просто site.ua";

const result8 = text8.match(/((http|https):\/\/)?(www\.)?[\w.\-]+[a-z.]{2}/g);
console.log(result8); // Очікується: ['https://example.com', 'http://test.org', 'www.something.net', 'site.ua']

// Особисті завдання (9):
const text9 = "У стилі використано кольори: #fff, #000000, #AbC123, а іноді некоректні: #12, #GGG, #12345.";

const result9 = text9.match(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g);
console.log(result9); // Очікується: ['#fff', '#000000', '#AbC123']

// Особисті завдання (10):
const text10 = "Документація тут: [Google](https://google.com), ще можна глянути [MDN](http://developer.mozilla.org) чи просто [Docs](/local/path). Але це не посилання: [Bad](not a url).";

const result10 = text10.match(/\[[^\]]+\]\((|http(s?):\/\/|\/)?[^\s]+\)/g);
console.log(result10); // Очікується: ['[Google](https://google.com)', '[MDN](http://developer.mozilla.org)', '[Docs](/local/path)']

// Особисті завдання (11):
const text11 = "Ось тестові картки: 1234-5678-9012-3456, інша – 9876 5432 1098 7654, а 1111222233334444 – не підходить, як і 1234-5678-9012-345.";

const result11 = text11.match(/\b\d{4}[\-\s]\d{4}[\-\s]\d{4}[\-\s]\d{4}\b/g);
console.log(result11); // Очікується: ['1234-5678-9012-3456', '9876 5432 1098 7654']

// Особисті завдання (12):
const text12 = "Сьогодні вилітають рейси: AA1234, BZ9999 і ib0350. Також є кодовийі: ZZ123, XY12345, AB12CD.";

const result12 = text12.match(/\b[a-zA-Z]{2}\d{4}\b/g);
console.log(result12); // Очікується: ['AA1234', 'BZ9999', 'ib0350']

// Особисті завдання (13):
const text13 = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Головна сторінка</title>
      <meta charset="UTF-8">
    </head>
    <body>
      <h1>Ласкаво просимо!</h1>
      <title>Неправильний тег у тілі</title>
      <p>Контент сайту...</p>
    </body>
  </html>
`;

const result13 = text13.match(/<title>.*?<\/title>/g);
console.log(result13); // Очікується: ['<title>Головна сторінка</title>', '<title>Неправильний тег у тілі</title>']



// \s - пробіл
// \w - a-zA-Z0-9_
// \d - 0-9
// \t - enter или відступ з нового рядку
// ^ - початок рядку. Текст починається на певний вираз
// $ - кінець рядку. Текст закінчюється на певний вираз
// [] - діапазон символів
// [^] - від'ємний діапазон, символи які треба ігнорувати
// (abc?) - опціональне значення abc
// (?<=abc) - вираз повинен початись на abc, при цьому abc не буде додано
// (?=abc) - вираз закінчюється на abc, де abc НЕ буде додано
// (?:abc) - вираз закінчюється на abc, де abc буде додано
// + знак - повторювати патерн до тих пір, де це можливо
// . знак - знайти будь-який символ
// {2} - повинно бути 2 символи
// {2,12} - кількість символів від 2 до 12
// (abc|def) - знайти abc або def
//
// flag i - ігнорувати регістр
// flag g - глобальний пошук