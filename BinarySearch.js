function binarySearch(arr, target) {
let left = 0;
let right = arr.length - 1;

while(left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (arr[middle] === target) {
        return middle;
    }
    else if (arr[middle] < target) {
        left = middle + 1;
    } else {
        right = middle - 1;
    }
}
return false;
}

const array = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40];
console.log(binarySearch(array, 34))