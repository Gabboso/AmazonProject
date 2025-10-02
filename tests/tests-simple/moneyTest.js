// moneyTest ---> we're gonna test related functions
import {formatCurrency} from '../../scripts/utils/money.js';







console.log('test suite: formatCurrency');



// automated check

console.log('converts cents into dollars'); // naming convention ---> describe what the code is doing ('it' / 'the code' <-- subject)

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}


console.log('works with 0');

if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}


console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds down to the nearest cent')

if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with negative numbers');

if (formatCurrency(-1000) === '-10.00') {
  console.log('passed');
} else {
  console.log('failed');
}