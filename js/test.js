function reverseSentence(sentence) {
  let words = sentence.split(' ');

  let l = 0, r = words.length -1;

  while (l < r) {
    let temp = words[l];
    words[l] = words[r];
    words[r] = temp;
    l++;
    r--;
  }

  return words.join(' ');
}

function reverseString(word) {
  char = word.split('');
  let l = 0, r = char.length -1;

  while (l < r) {
    let temp = char[l];
    char[l] = char[r];
    char[r] = temp;
    l++;
    r--;
  }

  return char.join('');
}

console.log(reverseSentence("test out reverse"));
console.log(reverseString("hello"));
