
### **Interviewer:**

Alright, let's try a new problem. Remember, focus on the plan first.

**Challenge #2: First Unique Character in a String**

**Difficulty:** Easy

Your task is to write a function `firstUniqChar(s)` that takes a string `s` as input. The function should find the **first character in the string that does not repeat itself anywhere else in the string** and return its **index**.

If there is no unique character, the function should return `-1`.

**Example 1:**
*   Input: `s = "leetcode"`
*   Expected Output: `0`
    *   ('l' is the first character that appears only once)

**Example 2:**
*   Input: `s = "loveleetcode"`
*   Expected Output: `2`
    *   ('l' appears twice, 'o' appears twice, but 'v' is the first character to appear only once)

**Example 3:**
*   Input: `s = "aabb"`
*   Expected Output: `-1`
    *   (every character repeats)

Take your time. How would you approach this? Please write down your step-by-step algorithm.

### **My Solution**

Okay so my first idea for this starting doing a for loop which will traverse all the string, then we can have a hash map which save all the letter and by his character and his count for the letter and i think we can include the index in something like this 

First round will be
character = l
index = 0
character exists on the hash map? no so this will include the letter, start the cound and his index like this { "l": { index: 0, count: 1 }}

then we move to the second letter
character = e
index = 1
character exists on hash map? no so include the letter, cound and index for the hash map 
{ 
    "l": { index: 0, count: 1 },
    "e": { index: 1, count 1}
}

then we move from the third letter
character = e 
index = 2
character exist on hash map? yes, so in this case we have 2 options, conver the index in an array so we can have something like this index; [1, 2] with both index and increment the count but i think adding space to index will not be a great solution so to resolve this, we can convert the index into the last repeated index which will be only 2, and in that case we dont need to use more space beucase if we have la 1000 thousand words it could be bad and we dont need really matter when the count is greater than 1 

so in more simple words, lets repeat this new index with the new solution

then we check 
character = e
index = 2
character exist on hash map? yes so we increment the index and we reasign the new index which is 2 so in that case will be like this, and we can change the index from lastIndex so it would be more descriptive but for this i'll keep it just in that way

{ 
    "l": { index: 0, count: 1 },
    "e": { index: 2, count 2}
}


then we move to the fourth letter
character = t
index = 3 
character exist on hash map? no so we include that into the hash map

{ 
    "l": { index: 0, count: 1 },
    "e": { index: 2, count 2},
    "t": { index: 3, count 1},
}

then we move from the 5 letter
character = c
index = 4
character exist on hash map? no so we include that into the hash

{ 
    "l": { index: 0, count: 1 },
    "e": { index: 2, count 2},
    "t": { index: 3, count 1},
    "c": { index: 4, count: 1}
}

and so on

then after doing this, when the code or for completes we can do some validations

check every key value on the hash,

if key of object && key.count === 1{
    return key.index
}

return -1
 
 and i think this is all

### Feedback

There is one subtle but very important issue in the final step of your 

check every key value on the hash,

```
if (key of object && key.count === 1){
    return key.index

}
```


The problem here is that a standard JavaScript object ({}) does not guarantee the order of its keys.

When you loop over the keys in your hash map at the end, the keys might come out in any order ('e', 'l', 't', 'c', ...). This means you might find a character that is unique (count is 1), but it might not be the first unique character from the original string.

**Example:**

- Input string: s = "statistics"
- The first unique character is 'a' at index 3.
- Your final hash map might look something like this (simplified):

```
{
  's': { count: 3, ... },
  't': { count: 3, ... },
  'a': { count: 1, index: 3 }, // The one we want!
  'i': { count: 2, ... },
  'c': { count: 1, index: 8 }
}
```

- When you loop over this map, what if the 'c' key comes before the 'a' key? Your code would find that 'c' has a count of 1 and would incorrectly return its index, 8, instead of the correct answer, 3.

Your logic is sound, but it relies on something that the data structure doesn't promise. So, how can we fix this while keeping your great ideas?

### The Refined Algorithm: A Simpler Approach (The "Two-Pass" Method)

Let's refine your idea slightly. This is a very common and reliable pattern for this type of problem.

**Insight:** The only place the *correct order* is preserved is in the **original string itself**. So, we should use the string to check for the answer, and use our hash map just as a quick reference for counts.

**Pass 1: Build a Frequency Map (Just for counts).**
*   Create an empty hash map `counts`.
*   Loop through the string `s` **once**.
*   For each character, just count its occurrences. We don't need to store the index here, which makes our map simpler.
    *   After this pass on `"loveleetcode"`, our map would look like this:
        `{ l: 2, o: 2, v: 1, e: 4, t: 1, c: 1, d: 1 }`

**Pass 2: Find the First Unique Character by Checking the Map.**
*   Now, loop through the original string `s` a **second time**, from beginning to end (from `i = 0` to `s.length - 1`).
*   For each character `s[i]`:
    *   Look up this character in your `counts` map.
    *   **Is its count in the map equal to 1?**
    *   If YES, you've found it! This is the first unique character because you are iterating in the original order. **Return its index `i` immediately.**
*   If you finish this second loop and never returned, it means no character had a count of 1. In this case, **return -1** after the loop.
