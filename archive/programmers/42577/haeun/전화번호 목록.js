function solution(phone_book) {
  const map = {};

  phone_book.sort((a, b) => b.localeCompare(a));

  for (const phoneNumber of phone_book) {
    if (map[phoneNumber]) return false;

    let str = "";

    for (const char of phoneNumber) {
      str += char;
      map[str] = (map[str] || 0) + 1;
    }
  }

  return true;
}
