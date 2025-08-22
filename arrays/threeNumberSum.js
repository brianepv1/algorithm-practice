function threeNumberSum(array, targetSum) {
    // Write your code here.
    let sortedArray = array.sort((a,b) => a - b);
    let triplets = [];
  
    for( let i = 0; i < sortedArray.length - 2; i++){
      let leftPointer = i + 1;
      let rightPointer = sortedArray.length - 1;
      while ( leftPointer < rightPointer) {
        const currentSum = sortedArray[i] + sortedArray[leftPointer] + sortedArray[rightPointer];
        if(currentSum === targetSum) {
          triplets.push([ sortedArray[i], sortedArray[leftPointer], sortedArray[rightPointer] ]);
          leftPointer++;
          rightPointer--;
        }else if(currentSum < targetSum) {
            leftPointer++;
        }else if(currentSum > targetSum) {
            rightPointer--;
        }
      }
    }
    return triplets;
  }

console.log('Result: ', threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0));
console.log('Result: ', threeNumberSum([1, 2, 3], 6));
console.log('Result: ', threeNumberSum([1, 2, 3], 7));
console.log('Result: ', threeNumberSum([8, 10, -2, 49, 14], 57));
console.log('Result: ', threeNumberSum([12, 3, 1, 2, -6, 5, 0, -8, -1], 0));
console.log('Result: ', threeNumberSum([12, 3, 1, 2, -6, 5, 0, -8, -1, 6], 0));
console.log(
    'Result: ',
    threeNumberSum([12, 3, 1, 2, -6, 5, 0, -8, -1, 6, -5], 0)
);
console.log('Result: ', threeNumberSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 15], 18));
console.log('Result: ', threeNumberSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 15], 32));
console.log('Result: ', threeNumberSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 15], 33));
console.log('Result: ', threeNumberSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 15], 5));
