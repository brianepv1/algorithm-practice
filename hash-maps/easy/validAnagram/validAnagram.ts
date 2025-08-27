function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }
  
    let letterCount = {};
  
    for (let i = 0; i < s.length; i++) {
      let char = s[i];
  
      if (char in letterCount) {
        letterCount[char] = letterCount[char] + 1;
      } else {
        letterCount[char] = 1;
      }
    }
  
    for (let j = 0; j < t.length; j++) {
      let char = t[j];
      if (char in letterCount && letterCount[char] > 0) {
        letterCount[char] = letterCount[char] - 1;
      } else {
        return false;
      }
    }
  
    console.log(letterCount);
  
    return true;
  }
  
  const result = isAnagram('anagram', 'nagaram');
  console.log('isAnagram? ', result);

  const result2 = isAnagram("rat", "car");
  console.log('isAnagram? ', result2);

  const result3 = isAnagram("listen", "silent");
  console.log('isAnagram? ', result3);
