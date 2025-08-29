function containsNearbyDuplicate(nums: number[], k: number): boolean {
    let windowContents = new Set<number>();
    let start = 0;

    while(start < nums.length ){

        const currentNumber = nums[start];

        if(windowContents.has(currentNumber)){
            return true;
        }

        windowContents.add(currentNumber);

        if(windowContents.size >= k){
            windowContents.delete(nums[start - k])
        }

        start++;
        console.log(windowContents);
    }
    return false
}

const result1 = containsNearbyDuplicate([1, 2, 3, 1], 3);
console.log("Result: ", result1)

const result2 = containsNearbyDuplicate([1, 0, 1, 1], 1);
console.log("Result: ", result2)

const result3 = containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
console.log("Result: ", result3)

