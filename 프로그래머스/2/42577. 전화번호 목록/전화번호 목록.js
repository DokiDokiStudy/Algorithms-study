function solution(phone_book) {
  const phoneBook = new Set(phone_book);
  for (const phone of phone_book) {
    for (let i = 1; i <= phone.length; i++) {
      const text = phone.slice(0, i);
      if (phoneBook.has(text) && text !== phone) {
        return false;
      }
    }
  }

  return true;
}