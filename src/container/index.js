export function createRandomString(wordLength, words) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let j = 0; j < words; j++) {
    for (let i = 0; i < wordLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    j < words - 1 && (result += " ");
  }
  return result;
}
