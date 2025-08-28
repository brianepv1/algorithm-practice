**Challenge #5: Group Anagrams**

**Difficulty:** Medium

Your task is to write a function `groupAnagrams(strs)` that takes an array of strings, `strs`, as input. The function should group the anagrams together and return them as an array of arrays. The order of the output groups does not matter.

**Example 1:**
*   Input: `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
*   Expected Output: `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`

**Example 2:**
*   Input: `strs = [""]`
*   Expected Output: `[[""]]`

**Example 3:**
*   Input: `strs = ["a"]`
*   Expected Output: `[["a"]]`

---

### Comprehension Questions

Before you think about the full algorithm, please answer these questions to ensure you understand the rules of the game:

1.  If you have two words, like "listen" and "silent," what is the most reliable, programmatic way to confirm that they are anagrams of each other?

- **My answer:**

```
If they have the same length it means they could be anagrams
```


- **Feedback answer:**

```
You are absolutely right that checking the length is the first step! But as you said, it only means they could be anagrams. What is a definitive way to prove it?

Think about the definition: anagrams have the exact same characters, just in a different order. How can we ignore the order?
The simplest trick is to sort the characters of both words. If the sorted versions are identical, they must be anagrams.

"listen" -> sort the characters -> "eilnst"
"silent" -> sort the characters -> "eilnst"

Since "eilnst" is equal to "eilnst", they are anagrams. This is a 100% reliable programmatic check.
```

2.  The most important part of this problem is deciding what to use as the **`key`** in your hash map. If the `key` must be identical for all words that are anagrams of each other (e.g., "eat," "tea," and "ate" must all share the same key), what kind of "signature" or "unique identifier" could you create from each word to achieve this?

- **My answer:**

```
"I was thinking on the index... or probably we can use the first words that we find, for example eat would be a key for eat, tea, and ate..."
```

- **Feedback answer:**


```
- Using the index: This won't work because words at different indices can be anagrams (e.g., strs[0]="eat" and strs[1]="tea").

- Using the first word you find: This is a clever idea, but it has a problem. What if the input array was ["tea", "tan", "ate", "nat", "bat", "eat"]? The key for the first group would be "tea". When your code gets to the final word, "eat", how does it know it belongs in the group keyed by "tea"? You would have to check if "eat" is an anagram of every key you've already created. This can get slow.

**The Solution is in Question #1!**

 We need a "signature" or "identifier" that is the exact same for all anagrams. The sorted string is the perfect key!

For "eat", the key is "aet".
For "tea", the key is also "aet".
For "ate", the key is also "aet".
For "tan", the key is "ant".
For "nat", the key is also "ant".

This is the central insight of the problem. The sorted version of a word is its canonical representation.
```


3.  Once you have that unique `key` for a group of anagrams, what data type should you store as the **`value`** in your hash map in order to group all the original words that belong to that group?


- **My answer:**

```
"I think a array could be okay... the value will be an arrays of arrays of string"
```

- **Feedback answer:**

```
- The value for a single key in the map will be a simple array of strings. For example: map['aet'] = ["eat", "tea", "ate"].

- The final output of the entire function will be an array containing all of those value arrays.
```


### The solution

#### The Refined Plan

Now, let's put these refined ideas together into a clear algorithm.

1.  **Initialize an empty hash map.** Let's call it `anagramGroups`. This map will store our results.
2.  **Iterate through each `word` in the input array `strs`.**
3.  For each `word`:
    a.  **Create the canonical key.** This is done by splitting the word into characters, sorting them, and joining them back into a string. (e.g., `"eat"` -> `['e', 'a', 't']` -> `['a', 'e', 't']` -> `"aet"`).
    b.  **Check if this `key` already exists in your `anagramGroups` map.**
        *   If **YES**, it means we've seen an anagram of this word before. Push the *original* `word` into the array that already exists at that key. (`anagramGroups[key].push(word)`).
        *   If **NO**, it means this is the first word of its kind. Create a new entry in the map where the key is our new `key`, and the value is a new array containing just the *original* `word`. (`anagramGroups[key] = [word]`).
4.  **Finish the loop.** At this point, your map will look something like this:
    ```
    {
      "aet": ["eat", "tea", "ate"],
      "ant": ["tan", "nat"],
      "abt": ["bat"]
    }
    ```
5.  The problem asks for an array of arrays, not an object. The final step is to extract all the **values** from your map and return them as an array. Most languages have a built-in way to do this (e.g., `Object.values(anagramGroups)`).

### Write solution withouth code

Starting from zero

this is the input and expected output

Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Expected Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

So we starting setting a variable to save all the anagrams can be called

groupAnagrams = {}

With this we need to start looking into the words so i was thinking on split the words 1 by 1 but im wrong on that because is already an array and not a string so we cant use the split on this only splice which is a different method

so we need start travesign de array word by word

so we can start traversing in index 0

which word = srt[i] = eat

in other anagrams examples we usually check if the word is on the same length as other words what i mean with this is

we usually check for 2 words if that is an anagram but that dont work here because yea we are cheking for anagrams but we are not comparing that we are groupin which is different

so in the other examples we do word1 length is equal to word2 length?

then if this is yes it mean that can be an anagram but if not the words cant be anagram

so to continue with the exercise in this case we are usign other method to see if the word is an anagram and also use that as a key, my idea was to use the normal word as a key in the hash but this has some ploblems instead we are going to do the next thing:

So we are get the var word which is equal to "eat" in this moment we are going to split that as i say in previous lines and after separate that it we are going to sort that word and finally use that as a key.

You may asking why?

Because if we sort 2 words that are a anagram it wil have the same sorting at the end but if the word dont sort in the same way then is not an anagram

so lets put an example:

```
word "eat" -> split into ["e","a,"t"] -> sort that into ["a", "e", "t"]
-> join that "aet" -> final key equal to "aet"
```

if we use a word nat to see a second example

we can see that is not an anagram

```
word "nat" -> split into ["n", "a", "t"] -> sort that into ["a", "n", "t"] -> join that "ant" -> final key "ant"
```

so with this example we can define the key and also verify is that is part of anagram

then we check if that key is on the hasp map

if yes then we push that word into that existing key

if not then we add a new key to the hash map with the original word

and it may look like this

```
{
    "aet": ["eat", "ate"],
    "ant": ["nat, "tan"]
}
```

and so on, so as we dont need the to order the result we can get the value of each key and return that in a sigle array like this

```
[["nat, "tan"], "eat", "ate"]]
```
