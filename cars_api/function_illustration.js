function function1(arg1, arg2) {
  return function function2(arg3, arg4) {
    return arg1 + arg2 - (arg3 + arg4);
  };
}

const function1 = (arg1, arg2) => (arg3, arg4) => arg1 + arg2 - (arg3 + arg4);

const helmet = () => (req, res, next) => {
  //
};

// Arrow function
const controller = (req, res, next) => {
  //
};

// Non-arrow function
function controller(req, res, next) {
  //
}

helmet();

controller;

function1(1, 7)(3, 4);

const x = function1(1, 7);
const y = x(3, 4);

function sum1(a, b) {
  return a + b;
}

const sum2 = (a, b) => a + b;

sum1(1, 2);
sum2(1, 2);
