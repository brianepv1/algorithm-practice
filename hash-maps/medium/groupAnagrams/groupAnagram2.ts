// Second solutions more cleaner

function groupAnagrams(strs: string[]): Array<string[]> {
    const anagramGroups: { [key: string]: string[] } = {};

    for (const word of strs) { // Using a slightly cleaner for...of loop
        // Create the canonical key by sorting the string's characters
        const canonicalKey = word.split("").sort((a,b) => a.localeCompare(b)).join('');
        

        // If the key doesn't exist, initialize it with an empty array
        if (!anagramGroups[canonicalKey]) {
            anagramGroups[canonicalKey] = [];
        }

        // Push the original word into the correct group
        anagramGroups[canonicalKey].push(word);
    }

    // Return an array of all the value arrays from the map
    return Object.values(anagramGroups);
}

const result1 = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log("Result 1: ", result1);

const result2 = groupAnagrams([""]);
console.log("Result 2: ", result2);

const result3 = groupAnagrams(["a"]);
console.log("Result 3: ", result3);

const result4 = groupAnagrams(["", ""]);
console.log("Result 4: ", result4); // Correctly gives [["", ""]]