function containsNearbyDuplicate(nums: number[], k: number): boolean {
    let windowContents = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        if (windowContents.has(nums[i])) {
            return true;
        }

        windowContents.add(nums[i]);

        // keep window size <= k
        if (windowContents.size > k) {
            windowContents.delete(nums[i - k]);
        }
    }

    return false;
}

const result1 = containsNearbyDuplicate([1, 2, 3, 1], 3);
console.log("Result1: ", result1) // true

const result2 = containsNearbyDuplicate([1, 0, 1, 1], 1);
console.log("Result2: ", result2) // true

const result3 = containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
console.log("Result3: ", result3) // false
