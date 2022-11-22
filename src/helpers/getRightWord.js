export default function getRightWord(number, words = ['товар', 'товара', 'товаров']) {
  const expression = number % 100;
  const secondExpression = number % 10;

  if (expression >= 11 && expression <= 19) {
    return `${number} ${words[2]}`;
  }
  switch (secondExpression) {
    case 1:
      return `${number} ${words[0]}`;
    case 2: case 3: case 4:
      return `${number} ${words[1]}`;
    default:
      return `${number} ${words[2]}`;
  }
}
