const lds = require('lodash');

// Приклад масиву для тестування методів lodash
const array = [1, 2, 3, 4, 5, 6];

// Метод lds.chunk розділяє масив на групи заданого розміру
const chunks = lds.chunk(array, 2);
console.log('lds.chunk(array, 2):', chunks); // [[1, 2], [3, 4], [5, 6]]

// Метод lds.compact видаляє всі хибні значення з масиву
const compacted = lds.compact([0, 1, false, 2, '', 3]);
console.log('lds.compact([0, 1, false, 2, "", 3]):', compacted); // [1, 2, 3]

// Метод lds.difference повертає масив елементів, які присутні в першому масиві, але відсутні в інших
const difference = lds.difference([1, 2, 3], [4, 2]);
console.log('lds.difference([1, 2, 3], [4, 2]):', difference); // [1, 3]

// Метод lds.merge глибоко об’єднує власні та наслідувані вихідні об’єкти
const object1 = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
const object2 = { 'a': [{ 'c': 3 }, { 'e': 5 }] };
const merged = lds.merge(object1, object2);
console.log('lds.merge(object1, object2):', merged); // { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }

// Метод lds.random повертає випадкове число між нижньою та верхньою границею (включно)
const randomNum = lds.random(1, 10);
console.log('lds.random(1, 10):', randomNum); // Випадкове число між 1 та 10
