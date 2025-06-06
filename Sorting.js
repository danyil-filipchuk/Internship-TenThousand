// bubbleSort:

// function bubbleSort(arr){
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - 1 - i; j++) {
//             if (arr[j] > arr[j+1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j+1];
//                 arr[j+1] = temp;
//             }
//         }
//     }
//     return arr;
// }
//
// const test = [2,5,42,15,25,10];
// console.log(bubbleSort(test));

// selectionSort:

function selectionSort(arr){
    for (let i = 0; i < arr.length-1; i++) {
        let minIndex = i;
        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

const test = [2,5,42,15,25,10];
console.log(selectionSort(test));