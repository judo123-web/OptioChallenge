import { FirstLetterUperCasePipe } from './first-letter-uper-case.pipe';

describe('FirstLetterUperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterUperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
