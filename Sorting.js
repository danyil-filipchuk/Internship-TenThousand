// // Bubble Sort (Сортування бульбашкою):
//
// function bubbleSort(arr){
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - 1 - i; j++) {
//             if (arr[j] > arr[j+1]) { // або поставити < для сортування у зворотню сторону
//                 let temp = arr[j];
//                 arr[j] = arr[j+1];
//                 arr[j+1] = temp;
//             }
//         }
//     }
//     return arr;
// }
//
// const array1 = [2,5,42,15,25,10];
// console.log(bubbleSort(array1));
//
// // Selection Sort (Сортування вибором):
//
// function selectionSort(arr){
//     for (let i = 0; i < arr.length-1; i++) {
//         let minIndex = i;
//         for (let j = i+1; j < arr.length; j++) {
//             if (arr[j] < arr[minIndex]) { // або поставити < для сортування у зворотню сторону
//                 minIndex = j;
//             }
//         }
//         if (minIndex !== i) {
//             let temp = arr[i];
//             arr[i] = arr[minIndex];
//             arr[minIndex] = temp;
//         }
//     }
//     return arr;
// }
//
// const array2 = [2,5,42,15,25,10];
// console.log(selectionSort(array2));
//
// // Insertion Sort (Сортування включенням):
//
// function insertionSort(arr){
//     for (let i = 1; i < arr.length; i++) {
//         let temp = arr[i];
//         let j = i - 1;
//         while (j >= 0 && arr[j] > temp) { // або поставити < для сортування у зворотню сторону
//             arr[j+1] = arr[j];
//             j--;
//         }
//         arr[j+1] = temp;
//     }
//     return arr;
// }
//
// const array3 = [2,5,42,15,25,10];
// console.log(insertionSort(array3));
//
// // Merge Sort (Сортування злиттям):
//
// function mergeSort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }
//
//     const middle = Math.floor(arr.length / 2);
//     const left = mergeSort(arr.slice(0, middle));
//     const right = mergeSort(arr.slice(middle));
//
//     let i = 0;
//     let j = 0;
//     const sortedArr = [];
//
//     while (i < left.length && j < right.length) {
//         if (left[i] === right[j]) {
//             sortedArr.push(left[i], right[j]);
//             i++;
//             j++;
//         } else if (left[i] < right[j]) { // або поставити < для сортування у зворотню сторону
//             sortedArr.push(left[i]);
//             i++;
//         } else {
//             sortedArr.push(right[j]);
//             j++;
//         }
//     }
//
//     return  sortedArr
//         .concat(left.slice(i))
//         .concat(right.slice(j));
// }
//
// const array4 = [2,5,42,15,25,10];
// console.log(mergeSort(array4));
//
// // Quick Sort (Швидке сортування);
//
// function quickSort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }
//     const pivot = arr[Math.floor(arr.length / 2)];
//     const left = arr.filter(n => n < pivot); // або поставити > для сортування у зворотню сторону
//     const right = arr.filter(n => n > pivot); // або поставити < для сортування у зворотню сторону
//     const center = arr.filter(n => n === pivot);
//
//     return quickSort(left).concat(center, quickSort(right));
// }
//
// const array5 = [2,5,42,15,25,10];
// console.log(quickSort(array5));
//
// // Shell Sort (сортування Шелла);
//
// function shellSort(arr) {
//     for (let step = Math.floor(arr.length / 2); step > 0; step = Math.floor(step / 2)) {
//         for (let pass = step; pass < arr.length; pass++) {
//             for(let replacement = pass - step; replacement >= 0 && arr[replacement] > arr[replacement + step]; replacement -= step) {
//                 let tmp = arr[replacement];
//                 arr[replacement] = arr[replacement + step];
//                 arr[replacement + step] = tmp;
//             }
//         }
//     }
//     return arr;
// }
//
// const array6 = [2,5,42,15,25,10];
// console.log(shellSort(array6));
//
// // Count Sort (сортування підрахунком):
//
// function countSort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }
//
//     const maxValue = Math.max(...arr);
//     const count = new Array(maxValue + 1).fill(0);
//
//     for (const nums of arr) {
//         count[nums]++;
//     }
//
//     const result = [];
//     for (let value = 0; value <= maxValue; value++) { // для сортування у зворотню сторону - (let value = maxValue; value >= 0; value--)
//         const c = count[value];
//         for (let i = 0; i < c; i++) {
//             result.push(value);
//         }
//     }
//     return result;
// }
//
// const array8 = [2,5,42,15,25,10];
// console.log(countSort(array8));
