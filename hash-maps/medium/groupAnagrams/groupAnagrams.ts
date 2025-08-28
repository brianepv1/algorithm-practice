function groupAnagrams(srt: string[]): Array<string[]>{
    const groupAnagram: { [key: string]: string[] } = {}

    for(let i = 0; i < srt.length; i++){
        const word = srt[i];

        const canonicalKey = word.split("").sort((a,b) => a.localeCompare(b)).join('');

        if(canonicalKey in groupAnagram){
            groupAnagram[canonicalKey].push(word);
        }else{
            groupAnagram[canonicalKey] = [word];
        }
    }

    const groups = [];

    for(const key in groupAnagram){
        groups.push(groupAnagram[key])
    }

    return groups

    //Another return could be Object.values which return already and array of the values of the object
    // return Object.values(groupAnagram);
}

const result1 = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log("Result 1: ", result1)

const result2 = groupAnagrams([""]);
console.log("Result 2: ", result2)

const result3 = groupAnagrams(["a"]);
console.log("Result 3: ", result3)

