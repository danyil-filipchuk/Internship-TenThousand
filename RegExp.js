// 1):
// const text = 'Hello World1234+';

// const regexp = /[a-z]+/ig;
// const regexp = /[^0-9]+/ig;
// const regexp = /\w+/g;
// const regexp = /\d+/g;
// const regexp = /(?<=\s)[a-z]+(?:[a-z])/i;

// 2):
// const text = '<@Danya/>Hey Team. I would like to have a call with <@Dima123/> at 14:00. <@John/> would you join us?';

// const regexp = /(?<=@)\w+(?=\/)/g;
// const regexp = /(?<=<@)\w+/g;

// 3):
// const text = '<@Danya/>Hey Team. I citykyiv@gmail.com would like to have test@icloud.ua a call with my.email-123@sub.domain.com <@Dima123/> at 14:00. <@John/> would you join us?';

// const regexp = /[\w.-]+@[\w.-]+\.[a-z]{2,12}/g;

// 4):
// const text = '<@Danya/>Hey Team. I +380664531331 citykyiv@gmail.com +38 (066) 453-13-31 would like 38 (066) 453-13-31 to have test@icloud.ua a call with my.email-123@sub.domain.com <@Dima123/> at 14:00. <@John/> would you join us?';

// const regexp = /(\+?)\d+[0-9\-)(\s]{10,16}(?:\d)/g;

// 5):
// const text = 'MESS1KXD6549CA CALL1KXD6549USMESS6ZPP0V3LUS, CALLPZDE12S4US, MESSKXS49D16US'

// const regexp = /(mess|call)\w{8}(ca|us)/ig;

// 6):
// const text = 'citykyiv@kompas.travel';

//const regexp = /^[\w]+@[\w.]+\.[a-z]{2,12}$/

// 7):
// const text = 'https://www.youtube.com';

//const regexp = /^http(s?):\/\/[\w.\-]+\.[a-z]{2,12}$/g;

// Особисті завдання (1):
// const text = "Напишіть на info@example.com або support123@service.org, а також перевірте admin@localhost.";

// const result = text.match(/[\w.\-]+@[\w.\-]+(?:\.[a-z]{0,12})?\b/g);
// console.log(result); // Очікується: ['info@example.com', 'support123@service.org', 'admin@localhost']

// Особисті завдання (2):
// const text = "У мене є 3 яблука, 15 бананів і 1000 гривень.";

// const result = text.match(/\d+/g);
//console.log(result); // Очікується: ['3', '15', '1000']

// Особисті завдання (3):
const text = "Привіт <@John123/>, поговори з <@Anna/> і <@Dima_01/>";

const result = text.match(/<@\w+\/>/g);
console.log(result); // Очікується: ['<@John123/>', '<@Anna/>', '<@Dima_01/>']



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

// flag i - ігнорувати регістр
// flag g - глобальний пошук