function moveElementToEnd(array, toMove) {
    let leftPointer = 0;
    let rightPointer = array.length - 1;
    while (leftPointer < rightPointer) {

      while( leftPointer < rightPointer & array[rightPointer] === toMove){
        rightPointer--;
      }
      if(array[leftPointer] === toMove){
        swapElement(leftPointer, rightPointer, array);
      }
      leftPointer++;
    }
    return array;
  }
  
  function swapElement(left, right, array){
    const temporal = array[left];
    array[left] = array[right];
    array[right] = temporal;
  }

  console.log(moveElementToEnd([2, 1, 2, 2, 2, 3, 4, 2], 2));