function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(' ');
  
    if (words.length !== pattern.length) {
      return false;
    }
  
    let letterToWord: { [key: string]: string } = {};
    let wordToLetter: { [key: string]: string } = {};
  
    for (let i = 0; i < pattern.length; i++) {
      let currentLetter = pattern[i];
      let currentWord = words[i];
  
      if (currentLetter in letterToWord) {
        if (letterToWord[currentLetter] !== currentWord) {
          return false;
        }
      }
  
      if (currentWord in wordToLetter) {
        if (wordToLetter[currentWord] !== currentLetter) {
          return false;
        }
      }
  
      letterToWord[currentLetter] = currentWord;
      wordToLetter[currentWord] = currentLetter;
    }
  
    return true;
  }
  
  const result1 = wordPattern('abba', 'dog cat cat dog');
  console.log(result1);
  
  const result2 = wordPattern('abba', 'dog cat cat fish');
  console.log(result2);
  
  const result3 = wordPattern('aaaa', 'dog cat cat dog');
  console.log(result3);
  
  const result4 = wordPattern('abba', 'dog dog dog dog');
  console.log(result4);
  