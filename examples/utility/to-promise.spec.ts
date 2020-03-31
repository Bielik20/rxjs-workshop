import { of } from 'rxjs';

describe('Utility - toPromise', () => {
  it('toPromise', (done) => {
    of(1)
      .toPromise()
      .then((value) => {
        expect(value).toBe(1);
        done();
      });
  });
});
