**Challenge #1 (Sliding Window): Contains Duplicate II**

**Difficulty:** Easy

Your task is to write a function `containsNearbyDuplicate(nums, k)` that takes an array of integers `nums` and an integer `k` as input.

The function should return `true` if there are two **distinct indices** `i` and `j` in the array such that `nums[i] == nums[j]` and the **absolute difference** between `i` and `j` is less than or equal to `k`. Otherwise, return `false`.

**Example 1:**
*   Input: `nums = [1, 2, 3, 1]`, `k = 3`
*   Expected Output: `true`
    *   The number `1` appears at index `0` and index `3`. The absolute difference is `abs(0 - 3) = 3`, which is `<= k`.

**Example 2:**
*   Input: `nums = [1, 0, 1, 1]`, `k = 1`
*   Expected Output: `true`
    *   The number `1` appears at index `0` and index `2`. `abs(0 - 2) = 2`, which is `> k`.
    *   *However*, the number `1` also appears at index `2` and `3`. `abs(2 - 3) = 1`, which is `<= k`.

**Example 3:**
*   Input: `nums = [1, 2, 3, 1, 2, 3]`, `k = 2`
*   Expected Output: `false`
    *   The first pair of `1`s has a difference of 3 (`> k`).
    *   The first pair of `2`s has a difference of 3 (`> k`).
    *   The first pair of `3`s has a difference of 3 (`> k`).

---

### Comprehension Questions

Before you design the algorithm, let's break down the rules.

1.  The condition is `abs(i - j) <= k`. If you are currently examining the number at index `i`, what does this condition tell you about the "neighborhood" or "window" of indices you need to check for a duplicate? In other words, how far back from your current position do you need to look?

How far will depend on the ponters, could be 1, could be 2 or could n, basically the pointer will look to find number equal to i, if doest not exist then we skip that index

2.  The core task is to check for a duplicate number. If you have a collection of numbers (like the numbers inside your current "window"), what is the most efficient data structure to check if a new number you're about to add is already present in that collection?

I can use hash map to check the indexes or i can do it with two pointers var 

3.  As you slide your window across the array, you will be adding a new element on the right and (to keep the size fixed) removing an old element from the left. How would you update the data structure from question #2 to reflect this sliding motion?

I think we can mix in some way the two pointers in the hast map like

```
{
    "right": 0,
    "left": 3,
    "actualDifference": 2
}
```

Thank you for working through these questions. Your answers give us a great starting point. You have the right components in mind—pointers and hash maps—but we need to clarify how they fit together to form the "Sliding Window" pattern.

Let's review your answers with some feedback to build a clearer picture.

---

### **Feedback on Your Answers**

**On your answer to Question #1 (How far back to look):**

> "How far will depend on the ponters... the pointer will look to find number equal to i"

**Feedback:** You're right that pointers are involved, but we can be more specific. The condition `abs(i - j) <= k` is the key. Let's say your "current" position is `i`. This condition means the other index, `j`, can be no further than `k` spots away. So, you only need to look at the numbers in the "window" of indices from `i` down to `i - k`.

This tells us that the size of our "window of interest" is fixed. At any point, we only care about the current number and the previous `k` numbers. The total size of this sliding window is **`k + 1`**.

**On your answer to Question #2 (Efficient data structure for duplicates):**

> "I can use hash map to check the indexes or i can do it with two pointers var"

**Feedback:** A **hash map** is an excellent idea! It's far more efficient than just using pointers. While pointers will define the *boundaries* of our window, they can't quickly tell us if a duplicate exists *within* those boundaries.

A hash map (or even better, a **Hash Set**, which is a specialized map just for storing unique keys) is perfect for this. It allows you to check for the existence of a number in O(1) time—instantly. This is the right tool for the job.

**On your answer to Question #3 (How to update the data structure):**

> "I think we can mix in some way the two pointers in the hast map like `{"right": 0, "left": 3, ...}`"

**Feedback:** This is the most important point to clarify. The hash map's job is not to store the pointers themselves. Its job is to store the **actual numbers that are currently inside the window.**

Think of it like this:
*   The **pointers** (`left` and `right`) define the edges of your window on the main `nums` array.
*   The **Hash Set** is a separate helper that contains a copy of every number *between* those pointers.

As you slide the window one step to the right:
1.  A **new number** enters the window on the right. You **add** this number to your Hash Set.
2.  An **old number** leaves the window on the left. You **remove** this number from your Hash Set.

This way, your Hash Set always perfectly mirrors the contents of your current window.

---

### Summary of Refined Ideas

1.  We will use a "window" that slides across the `nums` array. This window will have a maximum size of `k + 1`.
2.  We will use a **Hash Set** to store the numbers that are currently inside our window.
3.  We will iterate through the array, adding one new number at a time to our window and our Hash Set.
4.  Before adding a new number, we first check the Hash Set: is this number already in here? If yes, we've found a duplicate within the allowed distance `k`, and we can return `true`.
5.  To keep the window size correct, if it ever gets larger than `k + 1`, we must remove the leftmost element from the window (and also from our Hash Set).

Based on this feedback, please try to outline your step-by-step plan (without code) to solve the `containsNearbyDuplicate` problem.


### Something to understand

Even if we can use hash map this time is better to use a hash set to have a better data structure because hash set only contains unique containers

so to set that we can called like this

```javascript
const mySet = new Set();  // Creates an empty Set

new Set(): Creates a new Set object. Optionally, an iterable (like an array) can be passed to initialize the Set with values.

add(value): Adds a new value to the Set.

delete(value): Removes a specified value from the Set. Returns true if the value was present and removed, false otherwise.

has(value): Checks if a value exists in the Set. Returns true if found, false otherwise.

clear(): Removes all elements from the Set.

size: A property that returns the number of elements in the Set.

forEach(callbackFn[, thisArg]): Executes a provided function once for each value in the Set.

entries(), keys(), values(): Return new Iterator objects that contain the values in the Set. For Set, keys() and values() are identical as there are no distinct keys like in a Map.
```

### Solution

We starting from our inputs and outputs

Input: nums = [1, 2, 3, 1], k = 3
Expected Output: true
The number 1 appears at index 0 and index 3. The absolute difference is abs(0 - 3) = 3, which is <= k.

So in this case we need to declare a hash set to start storing the unique values

we are going to call currentWindow = {}

we have to define a few var to help us

like start = 0, end = 0 and maxSize = k + 1

we are going to traverse the array with a condition like a while
while i < nums

and we start check a few thing

nums of index 0 equal to 1

nums = 1

is nums in the hash set?
no we continue and increase end plus 1 and we add the number to hash set

is hash set lenght greater than 3 + 1?
no so we all good

nums of index 0 equal to 1
nums = 1
end of index 1 equal to 2
end = 2

is nums in the hash set?
no we continue and increase end plus 1 and we add th enumber to has set

is hash set lenght greater than 3 + 1?
no so we all good

nums of index 0 equal to 1
nums = 1
end of index 2 equal to 3
end = 3


is nums in the hash set?
no we continue and increase end plus 1 and we add th enumber to has set

is hash set length greater than 3 + 1?
no so we all good

nums of index 0 equal to 1
nums = 1
end of index 3 equal to 1
end = 1

is nums in the hash set?
yes, return true

if the while end then we return true

This is a very good attempt at creating the plan. You have correctly identified the key components: a hash set, and a loop that iterates through the array. Your logic of checking "is this number in the hash set?" is exactly right.

However, your trace got a little bit confused, and the plan is missing a crucial step: **how to remove elements from the window.** Your current logic only adds elements, so the window will grow forever.

Let's refine your plan. Your core idea is solid, we just need to structure it into the classic sliding window algorithm.

### Feedback on Your Plan

**What You Did Well:**

*   **Correct Data Structure:** You chose a hash set (`currentWindow`) which is the perfect tool.
*   **Core Check:** The logic `if num in hash_set -> return true` is the central piece of the algorithm.
*   **Looping:** You knew you needed to iterate through the array.

**Where We Need to Refine:**

*   **The "Sliding" Motion:** A sliding window needs to both **add** on the right and **remove** on the left. Your current plan only adds.
*   **Variable Management:** Using `start` and `end` pointers is correct, but let's simplify. A standard `for` loop can act as our "end" pointer, which makes the code cleaner.

---

### A Simpler, More Structured Algorithm

Let's use a single `for` loop to iterate through the array. The loop's index `i` will represent the **right edge** of our sliding window.

**The Refined Plan:**

1.  **Initialize a Hash Set.** Let's call it `windowContents`. This will store the numbers currently inside our sliding window.
2.  **Iterate through the `nums` array with a `for` loop, from index `i = 0` to the end.** For each number `nums[i]`:
    a.  **The Check:** Before doing anything else, check if the current number `nums[i]` is **already in the `windowContents` set.**
        *   If **YES**, you've found a duplicate within the allowed range `k`. **Return `true` immediately.**

    b.  **The Addition:** If the check passes (it's not a duplicate), add the current number `nums[i]` to the `windowContents` set.

    c.  **The Removal (The "Sliding" Part):** Now, we need to make sure our window doesn't get too big. Check if the size of the `windowContents` set is **greater than `k`**. (Note: a simpler way to think about this is checking if `i >= k`).
        *   If **YES**, it means our window is now too large. We must remove the element that just fell off the **left side** of the window.
        *   The element to remove is at index `i - k`. So, remove `nums[i - k]` from the `windowContents` set.

3.  **The Final Return:** If the loop finishes completely without ever returning `true`, it means no nearby duplicates were found. **Return `false`.**

### Let's trace your example with this new plan:
`nums = [1, 2, 3, 1]`, `k = 3`

*   **i = 0:** `num = 1`.
    *   Is `1` in the set? No.
    *   Add `1` to set. Set is now `{1}`.
    *   Is `i >= k` (is `0 >= 3`)? No.
*   **i = 1:** `num = 2`.
    *   Is `2` in the set? No.
    *   Add `2` to set. Set is now `{1, 2}`.
    *   Is `i >= k` (is `1 >= 3`)? No.
*   **i = 2:** `num = 3`.
    *   Is `3` in the set? No.
    *   Add `3` to set. Set is now `{1, 2, 3}`.
    *   Is `i >= k` (is `2 >= 3`)? No.
*   **i = 3:** `num = 1`.
    *   Is `1` in the set? **Yes!**
    *   **Return `true`**. The algorithm stops.

### Let's trace the other example:
`nums = [1, 2, 3, 1, 2, 3]`, `k = 2`

*   **i = 0:** `num = 1`. Add `1`. Set is `{1}`.
*   **i = 1:** `num = 2`. Add `2`. Set is `{1, 2}`.
*   **i = 2:** `num = 3`.
    *   Is `3` in set? No.
    *   Add `3`. Set is `{1, 2, 3}`.
    *   Is `i >= k` (is `2 >= 2`)? Yes. We must remove the leftmost element.
    *   The element to remove is at `i - k = 2 - 2 = 0`. That is `nums[0]`, which is `1`.
    *   Remove `1` from set. Set is now `{2, 3}`.
*   **i = 3:** `num = 1`.
    *   Is `1` in set? No.
    *   Add `1`. Set is `{2, 3, 1}`.
    *   Is `i >= k` (is `3 >= 2`)? Yes. Remove element at `i - k = 3 - 2 = 1`. That is `nums[1]`, which is `2`.
    *   Remove `2` from set. Set is now `{3, 1}`.
*   ...and so on. The loop will finish.
*   **Return `false`**.