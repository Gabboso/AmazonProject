import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95'); // [expect => object]
  });
 
  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00'); // [expect => object]
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })
});        // fun that creat a test suit (group of related tests)

