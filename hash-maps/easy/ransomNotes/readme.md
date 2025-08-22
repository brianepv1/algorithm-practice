### **Interviewer:**

Alright, let's begin with our first problem. We'll start in the "easy" category to get warmed up.

---

### **Challenge #1: Ransom Note**

**Difficulty:** Easy

#### **Problem Description**

You are tasked with writing a function `canConstruct(ransomNote, magazine)` that will determine if a `ransomNote` string can be constructed by using the letters from a `magazine` string.

#### **Key Rules**

1.  Each character in the `magazine` can only be used once in your `ransomNote`.
2.  The function should be case-sensitive ('a' is not the same as 'A').

#### **Examples**

**Example 1:**
*   **Input:** `ransomNote = "a"`, `magazine = "b"`
*   **Expected Output:** `false`

**Example 2:**
*   **Input:** `ransomNote = "aa"`, `magazine = "ab"`
*   **Expected Output:** `false` (because there is only one 'a' available in the magazine)

**Example 3:**
*   **Input:** `ransomNote = "aa"`, `magazine = "aab"`
*   **Expected Output:** `true`

**Example 4:**
*   **Input:** `ransomNote = "book"`, `magazine = "brooklyn"`
*   **Expected Output:** `true`

---

## Solution



