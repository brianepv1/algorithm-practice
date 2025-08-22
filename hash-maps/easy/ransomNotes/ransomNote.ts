function canConstruct(ransomNote: string, magazine: string) {
    let magazineChar: { [key: string]: number } = {};
    for (let i = 0; i < magazine.length; i++) {
      let char = magazine[i];
  
      if (char in magazineChar) {
        magazineChar[char]++;
      } else {
        magazineChar[char] = 1;
      }
    }
  
    for (let j = 0; j < ransomNote.length; j++) {
      let char = ransomNote[j];
      if (char in magazineChar && magazineChar[char] > 0) {
        magazineChar[char] = magazineChar[char] - 1;
      } else {
        return false;
      }
    }
  
    console.log(magazineChar);
    return true;
  }
  
  const result = canConstruct('book', 'brooklyn');
  console.log('Can we create the word? ', result); // Expected: true
  
  const result2 = canConstruct('a', 'b');
  console.log('Can we create the word? ', result2); // Expected: false
  
  const result3 = canConstruct('aa', 'ab');
  console.log('Can we create the word? ', result3); // Expected: false