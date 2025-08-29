**Challenge #6: Longest Substring Without Repeating Characters**

**Difficulty:** Medium

Your task is to write a function `lengthOfLongestSubstring(s)` that takes a string `s` as input. The function should find the length of the **longest substring** within `s` that does not contain any repeating characters.

A **substring** is a contiguous sequence of characters within a string.

**Example 1:**
*   Input: `s = "abcabcbb"`
*   Expected Output: `3`
    *   The longest substring without repeating characters is `"abc"`, with a length of 3.

**Example 2:**
*   Input: `s = "bbbbb"`
*   Expected Output: `1`
    *   The longest substring is `"b"`, with a length of 1.

**Example 3:**
*   Input: `s = "pwwkew"`
*   Expected Output: `3`
    *   The longest substring is `"wke"`, with a length of 3. Note that `"pwke"` is a subsequence, but not a *substring*, so it's not a valid answer.

---

### Comprehension Questions

Before you formulate a plan, let's make sure the problem's constraints are crystal clear. Please answer the following:

1.  The problem is about finding a "substring without repeating characters." Imagine you are scanning the string `"ab**c**a**b**cbb"` from left to right. Your current valid substring is `"abc"`. The very next character you see is `'a'`. What does this repeat tell you, and what must happen to your current substring for it to become valid again?
2.  As you scan the string, what is the single most important piece of information you need to remember about each character you've already seen in your current valid substring? (Hint: It's not just *that* you've seen it, but something more specific).
3.  Based on your answer to #2, what data structure would be the most efficient for storing and retrieving this essential information about the characters you've encountered?

### Answer to question

1. As far as i can understand a substring withouth repeating characters means for me a string that does not repeat a character, this is saying longest substring but doest not say anithing that need to be on sort or secuence so we are looking to string that are different or unique letter only


2.- that needs to be unique and no repeating

3.- As far as i know we can do this with arrays only but as we are working with hash map i think do something like set the hash map only with the substrings and his lenght


### Feedback

Thank you for these answers. They are very helpful because they show exactly where the tricky parts of this problem lie. Your current understanding is logical, but it has a few critical misunderstandings that we need to clear up before you can build a successful plan. This is a perfect example of why this Q&A step is so valuable.

Let's go through your answers with some feedback.

---

### **Feedback on Your Answers**

**On your answer to Question #1 (What happens when a repeat is found):**

> "a substring withouth repeating characters means for me a string that does not repeat a character, this is saying longest substring but doest not say anithing that need to be on sort or secuence..."

**Feedback:** You are right that the characters don't need to be sorted. However, you've missed the most important word in the problem description: **substring**.

A **substring** is a *contiguous* (unbroken) sequence of characters.
A **subsequence** can have gaps.

Let's look at the example `s = "pwwkew"`:
*   `"wke"` is a **substring**. The characters are together in the original string.
*   `"pwke"` is a **subsequence**. To get it, you have to skip over the second 'w'.

The problem is asking for the longest **substring**. This means your window of characters must always be a single, connected block.

Now, let's re-address the second part of the original question: You have a valid substring `"abc"`. The next character you see is `'a'`. Because a substring must be contiguous, your new potential substring is `"abca"`. This is invalid. **To make it valid again, you must remove characters from the beginning until the first `'a'` is gone.** Your new valid substring would be `"bca"`.

This idea of expanding a window from the right and shrinking it from the left is the most important concept for this problem.

**On your answer to Question #2 (Most important information to remember):**

> "that needs to be unique and no repeating"

**Feedback:** This is true, but we need to be more specific. Let's use our example: you have `"abc"` and the next character is `'a'`. You know `'a'` is a repeat. But to fix your substring, you need to know *where* the last `'a'` was. It was at the very beginning. This tells you that your new substring must start *after* that original position.

So, the single most important piece of information you need to remember about a character is its most recent **index**.

**On your answer to Question #3 (Which data structure to use):**

> "As far as i know we can do this with arrays only but as we are working with hash map i think do something like set the hash map only with the substrings and his lenght... `{'abc': 3, 'zfkw': 4}`"

**Feedback:** This is a logical first thought, but it would be very inefficient. To build a map like that, you would have to find *every single possible substring*, check each one for uniqueness, and then store it. For a long string, this would be incredibly slow.

Let's connect this back to the feedback from Question #2. A much faster approach is to build up your substring one character at a time. The data structure you need should help you answer this question instantly: **"Have I seen this character in my current window, and if so, at what index?"**

What data structure lets you use a *character* as a key to instantly look up its *index* (as the value)? This is a perfect use case for a hash map, but used in a different way than you proposed. The map would store `character -> last_seen_index`.

---

### Summary of Refined Ideas

1.  We are building a **contiguous** window (a substring).
2.  We will expand this window by adding characters from the right.
3.  When we find a repeating character, we must shrink the window from the left to a new starting point.
4.  To know where that new starting point is, we need to efficiently store and retrieve the **last seen index** of each character in our current window. A hash map is the perfect tool for this.

With these refined ideas in mind, please take another shot at outlining your step-by-step plan (without code) to solve the `lengthOfLongestSubstring` problem.


### Solutions

Well after receive that feedback i can remeber that exists a pattern called sliding window, that i dont remeber how to apply but i remeber a few things so lets try to figure out this problem

So, the first think is set our goal

Input: s = "abcabcbb"
Expected Output: 3



