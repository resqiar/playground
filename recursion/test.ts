function getMinMax(array: number[]): number[] {
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < array.length; i++) {
    min = Math.min(min, array[i]);
    max = Math.max(max, array[i]);
  }

  return [min, max];
}

console.log(getMinMax([111, 99, 200, 11, 55]));

function handGameResult(player_1: string, player_2: string): string {
  const possibility = new Map([
    ["SCISSORSPAPER", "PLAYER 1 WIN"],
    ["SCISSORSSCISSORS", "DRAW"],
    ["ROCKPAPER", "PLAYER 2 WIN"],
    ["PAPERPAPER", "DRAW"],
  ]);

  return possibility.get(player_1.toUpperCase() + player_2.toUpperCase()) ?? ""
}

function sumDigits(number: number) {
  while (number >= 10) {
    let sum = 0;

    while (number > 0) {
      sum += number % 10;
      number = Math.floor(number / 10);
    }

    number = sum;
  }

  return number;
}

console.log(sumDigits(38))
