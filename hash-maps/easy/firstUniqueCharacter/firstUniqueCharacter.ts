function firstUniqueCharacterInString(s: string): number{
    let countLetter: { [key: string]: number } = {}

    for(let i = 0; i < s.length; i++) {
        const letter = s[i]
        if(letter in countLetter){
            countLetter[letter]++;
        }else{
            countLetter[letter] = 1;
        }
    }

    console.log(countLetter);

    for(let i = 0; i < s.length; i++) {
        const letter = s[i]
        if(countLetter[letter] === 1){
            return i
        }
    }

    return -1

}


const result = firstUniqueCharacterInString("loveleetcode");

console.log(result);