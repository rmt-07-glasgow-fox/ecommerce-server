let str = 'giovaNna';

let toCapital = input => {
  return (input[0].toUpperCase() + input.slice(1).toLowerCase());
};

console.log(toCapital(str))