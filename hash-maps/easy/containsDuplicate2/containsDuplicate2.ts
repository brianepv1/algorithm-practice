function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const windowContents = new Set<number>();
    let i = 0; // Let's rename 'start' to 'i' to represent the right edge

    while (i < nums.length) {
        const currentNumber = nums[i];

        if (windowContents.has(currentNumber)) {
            return true;
        }

        windowContents.add(currentNumber);
        
        if (i >= k) {
            const leftmostNumber = nums[i - k];
            windowContents.delete(leftmostNumber);
        }
        
        i++;
    }
    return false;
}

const result1 = containsNearbyDuplicate([1, 2, 3, 1], 3);
console.log("Result 1 (true): ", result1);

const result2 = containsNearbyDuplicate([1, 0, 1, 1], 1);
console.log("Result 2 (true): ", result2);

const result3 = containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
console.log("Result 3 (false): ", result3);