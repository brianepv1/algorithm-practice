**Challenge #4: Word Pattern**

**Difficulty:** Easy

Your task is to write a function `wordPattern(pattern, s)` that takes a string `pattern` (containing only lowercase English letters) and a string `s` (containing lowercase English letters and spaces) as input.

The function should return `true` if the string `s` follows the same pattern as `pattern`. "Following the pattern" means there is a **bijection** (a one-to-one mapping) between a letter in `pattern` and a **non-empty word** in `s`.

This means:
1.  Every letter in `pattern` must map to exactly one word in `s`.
2.  Every word in `s` must map to exactly one letter in `pattern`.

**Example 1:**
*   Input: `pattern = "abba"`, `s = "dog cat cat dog"`
*   Expected Output: `true`
    *   (a -> dog, b -> cat)

**Example 2:**
*   Input: `pattern = "abba"`, `s = "dog cat cat fish"`
*   Expected Output: `false`
    *   (The pattern breaks at the end. 'a' should map to 'dog', not 'fish'.)

**Example 3:**
*   Input: `pattern = "aaaa"`, `s = "dog cat cat dog"`
*   Expected Output: `false`
    *   ('a' maps to 'dog', but then it's expected to map to 'cat', which is a conflict.)

**Example 4:**
*   Input: `pattern = "abba"`, `s = "dog dog dog dog"`
*   Expected Output: `false`
    *   (This is a tricky one. 'a' maps to 'dog', but then 'b' also tries to map to 'dog'. This is not allowed because two different letters cannot map to the same word.)

Before you think about code, lay out your plan. How would you start? What data structures would you need to keep track of these mappings?


### **Solution**

So, this is a interesting one, because is different i am thinkin on use 2 data structures the first 1 could be an array to basically separate the words that we are usign with a split function of js/ts, what i mean with this is we are going to use the split function to separete every word by the space that they are usign

so in the first place we are going to have

```
[
    "dog",
    "dog",
    "dog",
    "dog",
]
```

or 

```
[
    "dog",
    "cat",
    "cat",
    "dog",
]
```

so with this we have access to the words easily

Then we are going to traverse the pattern word to star setting a key value relationship between the arrays words and the pattern letter

so we are going to traverse the pattern word letter by letter and start asigning each word to the letter, but as we can see on the last test this means that we can have to set a validation to review if the value or the word is already asigned so i think we can set this in the next way

so we have to check if the word is equal to the already last value letter so this mean that this is a duplicate and we return that into false

we have to be carefully to check if the pattern is followed by the words so let do this step by step

so

The first step inside the funciton is to split the words

so lets say that 

``
words = [ "dog", "dog", "dog", "dog"]
``

the next step will be to traverse the pattern word each letter so

pattern = "aaaa"
s = "dog cat cat dog"

counts = {}
split the words
words = [ "dog", "cat","cat" ,"dog"]

traversing index 0
(char = pattern of index)
char = a

we starting checking 

a exist on counts?
No we assign a === to dog

counts = { "a": "dog" }

we check if next word is different that the actual index

char = a
(char2 = pattern of index + 1)
char 2 = a

if char eauls to char2?
yes so we skip asign

we have to check the next word

is word[1] === word[0]?
no is not, so if not following the pattern

and we return false in this case

i'll try with another example

parameters
pattern = "abba"
s = "dog cat cat dog"

starting code

counts = {}
words = [ "dog", "cat", "cat", "dog"]

traverse pattern by index 0
char = pattern[0]
char = a

a exist on counts? 
no so we assign a to the word of index 0 which is dog

so count = { a: dog}

we check if next word is different that the actual index?
word[0] !== word[1]? which means dog !== cat?
yes is different so we do nothing and continue

traverse pattern by index 1

char = pattern[1]
char = b

b exists on counts?
no so we assign b to the word of index 0 which is cat

so counts = { "a": dog, "b:" cat}

we check if the next word is different that the actual index?
word[1] !== word[2]? cat !== cat?
no is not is the same
char b exist on counts and value of char b is !== word[1]?
yes is diffirent return false
if the same? then continue 



traverse pattern by index 2

char = pattern[2]
char = b

b exists on count? 
yes then we dont have to do nothing because it follow the pattern

so counts remains as = { "a": dog, "b:" cat}

we check if the next word is different that the actual index?
word[2] !== word[3]? cat !== dog?
yea is different so do nothing

and continue to the next index


traverse pattern by index 3

char = pattern[3]
char = a

a exist on count?
yes so we do nothing

so counts remains as = { "a": dog, "b:" cat}

we check if the next word is different that the actual index?
we dont index here so we have to add a check if the index is equal to pattern lenght to avoid issues

but basically we are on the end of the index so we dont have to check nothing

and continue

so at this point we are basically done so we can return true at the end of the function 


and i just realize that i need to a check as guard clause at the beginning

if words length is different than pattern length then means that it dont follow a pattern

so we do the final test

paramaters
pattern = "abba"
s = "dog dog dog dog"

starting the code

words = [ "dog","dog","dog","dog"]

words length !== pattern length?

no we can continue

counts = {}
traverse pattern by index 0

char = pattern[0]
char = a

a exist on count?
no so we assign a to the word index 0 which is dog

counts = { a: dog }

we check if the next word is different that the actual index?
words[0] !== words[1]? which means dog !== dog?
no is not is the same
char a exist on counts and value of char a is !== word[1]?
yes is different result false
is the same? continue

### Feedback and Refinement

You correctly identified two main rules:
1.  A letter in `pattern` must always map to the *same* word. (`a` can't map to `dog` and then later to `fish`).
2.  (The tricky one) A word in `s` cannot be mapped to by *two different* letters. (`a` can't map to `dog` if `b` is already mapped to `dog`).

Your current plan tries to handle this by looking ahead (`index + 1`) and comparing adjacent words, which gets very complicated. There is a much cleaner way.

**The Insight: Use Two Maps (or a Map and a Set)**

The easiest way to enforce a **one-to-one** (bijection) relationship is to track the mappings in both directions.

*   **Map 1 (Letter to Word):** Checks if a letter is already mapped to a *different* word. (This handles `pattern="aaaa"`, `s="dog cat cat dog"`).
*   **Map 2 (Word to Letter):** Checks if a word has already been claimed by a *different* letter. (This handles the tricky case `pattern="abba"`, `s="dog dog dog dog"`).

Let's build a new, cleaner algorithm with this "two-map" idea.

---

### The Refined Algorithm

**Step 1: Initial Setup and Guard Clause**
1.  Split the string `s` into an array of words. Let's call it `words`.
2.  **Guard Clause:** Check if `pattern.length` is equal to `words.length`. If not, it's impossible to have a valid pattern. **Return `false` immediately.**
3.  Initialize two empty hash maps:
    *   `letterToWord = {}`
    *   `wordToLetter = {}`

**Step 2: Loop and Check Mappings**
1.  Iterate from `i = 0` to `pattern.length - 1`. In each iteration, you will have:
    *   `currentLetter = pattern[i]`
    *   `currentWord = words[i]`

2.  For each pair, perform **two checks** to see if a rule is broken:

    *   **Check #1 (Letter-to-Word consistency):**
        *   Does `currentLetter` already exist as a key in `letterToWord`?
        *   If YES, is its mapped word (`letterToWord[currentLetter]`) different from `currentWord`?
        *   If YES, a rule is broken (e.g., 'a' was 'dog' but now we see 'a' with 'cat'). **Return `false`.**

    *   **Check #2 (Word-to-Letter consistency):**
        *   Does `currentWord` already exist as a key in `wordToLetter`?
        *   If YES, is its mapped letter (`wordToLetter[currentWord]`) different from `currentLetter`?
        *   If YES, a rule is broken (e.g., 'dog' was mapped to 'a', but now 'b' is trying to claim 'dog'). **Return `false`.**

3.  **If both checks pass**, it means this is a new, valid mapping. So, establish the connection in **both maps**:
    *   `letterToWord[currentLetter] = currentWord`
    *   `wordToLetter[currentWord] = currentLetter`

**Step 3: Success Condition**
1.  If your loop finishes without ever returning `false`, it means no rules were broken for the entire length of the pattern.
2.  Therefore, you can **return `true`**.

### Let's trace the tricky example with this new algorithm:
`pattern = "abba"`, `s = "dog dog dog dog"`

1.  `words` = `["dog", "dog", "dog", "dog"]`. Lengths match.
2.  `letterToWord = {}`, `wordToLetter = {}`
3.  **Loop i = 0:** `currentLetter = 'a'`, `currentWord = 'dog'`
    *   Checks pass (maps are empty).
    *   Set maps: `letterToWord = { a: 'dog' }`, `wordToLetter = { dog: 'a' }`
4.  **Loop i = 1:** `currentLetter = 'b'`, `currentWord = 'dog'`
    *   **Check #1:** Does 'b' exist in `letterToWord`? No. Check passes.
    *   **Check #2:** Does 'dog' exist in `wordToLetter`? **Yes.** Is its mapped letter ('a') different from `currentLetter` ('b')? **Yes.**
    *   A rule is broken! You found that the word 'dog' is already claimed by 'a'. **Return `false`**.

This algorithm correctly catches the error. It's much simpler because you don't need to look ahead or behind in the arrays; you just check the state of your mapping objects at each step.

What do you think of this approach? It's built on your core ideas but simplifies the logic for handling the one-to-one rule. Try writing the code for this refined plan.

### **Personal feedback**

### The Core of Your Struggle: You Tried to Solve it Sequentially

Think about your proposed solution. It was based on looking at the *current* element and the *next* element (`word[i]` vs `word[i+1]`). This is a **sequential** or **linear** way of thinking. You are trying to find the pattern by looking at adjacent pairs.

This approach works for simple patterns (like finding consecutive duplicates), but it falls apart here because the rules are not about neighbors. The rules are **global**. The rule for `pattern="abba"` is that the 'a' at index 0 must map to the same word as the 'a' at index 3. These elements are far apart, so a neighbor-to-neighbor check will never be enough.

You intuitively realized this, which is why your logic started to get very complex with many `if` conditions. You were trying to patch a sequential approach to solve a non-sequential problem.

### The Missing Mental Tool: Explicitly Defining the Rules

The simpler, more robust solution comes from a different starting point. Instead of diving into the loop, you first step back and define the **rules of the system** as clearly as possible.

The problem states there must be a **"bijection"** (a one-to-one mapping). What does that actually mean? It means two separate rules must be true for the *entire* input, not just for adjacent elements:

*   **Rule #1: Every letter must map to only ONE word.**
    *   If you see `a -> dog` once, every other time you see `a`, it *must* be followed by `dog`.
    *   This is the "forward" mapping.

*   **Rule #2: Every word must be mapped to by only ONE letter.**
    *   If `dog` is claimed by `a`, no other letter (like `b`) can ever claim `dog`.
    *   This is the "backward" mapping.

This is the key insight you were missing. **The problem has two directions of constraints.** Your solution was only trying to solve for Rule #1. The "tricky part" (`"abba"`, `"dog dog dog dog"`) was tricky precisely because it's the part that breaks Rule #2.

### How This Leads to the "Two-Map" Solution

Once you have explicitly defined these two rules, the choice of data structure becomes obvious. You ask yourself: "**What tool do I need to enforce these rules?**"

1.  **To enforce Rule #1 ("forward mapping"):** "I need a way to quickly check, for any given letter, what word it maps to."
    *   The perfect tool is a hash map: `letterToWord`. The key is the letter, the value is the word.

2.  **To enforce Rule #2 ("backward mapping"):** "I need a way to quickly check, for any given word, what letter has claimed it."
    *   The perfect tool is another hash map: `wordToLetter`. The key is the word, the value is the letter.

The algorithm then writes itself. You are no longer thinking about `i` and `i+1`. You are thinking: "For each `(letter, word)` pair, I will check my rulebooks (my two maps). Does this pair violate either Rule #1 or Rule #2? If not, I'll update my rulebooks with this new information and continue."

### What to Learn and Practice for Next Time

1.  **Deconstruct the Prompt:** Before thinking about loops, identify the core constraints. Literally write them down. If you see words like "one-to-one," "unique mapping," or "bijection," your brain should immediately light up and think: **"This is a two-way street. I need to check the mapping in both directions."**

2.  **Think "State" not "Sequence":** Instead of asking "What's happening at `i+1`?", ask "Based on everything I've seen so far (the 'state' stored in my maps), is the current element `i` valid?"

3.  **Choose Data Structures to Enforce Rules:** Don't just pick a hash map because it's the topic. Ask: "What rule does this map help me enforce?" If you have two rules, it's very likely you need two data structures (or one that can handle both).

You were not able to find the solution because you were trying to solve a "global state" problem with a "local sequence" tool. By explicitly defining the problem's constraints first, you can choose the right tools and the algorithm becomes much, much simpler. This is a skill that comes with practice, and you're learning it right now.