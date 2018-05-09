import DynamicTitle from './DynamicTitle';

describe('DynamicTitle', () => {

  it('should display one country once', function () {
    const countries: String[] = ['Poland', 'Poland'];
    const months: String[] = ['January'];
    const title = new DynamicTitle(countries, months);
    const count = (title.value.match(/Poland/g) || []).length;
    expect(count).toBe(1);
  });

  it('should display each country only once', function () {
    const countries: String[] = ['Poland', 'Germany', 'Germany', 'Poland', 'USA'];
    const months: String[] = ['January'];
    const title = new DynamicTitle(countries, months);
    const countPoland = (title.value.match(/Poland/g) || []).length;
    const countGermany = (title.value.match(/Germany/g) || []).length;
    const countUSA = (title.value.match(/USA/g) || []).length;
    expect(countPoland).toBe(1);
    expect(countGermany).toBe(1);
    expect(countUSA).toBe(1);
  });

  it('should add \'and\' between last two countries', function () {
    const countries: String[] = ['Poland', 'Germany', 'Germany', 'Poland', 'USA'];
    const months: String[] = ['January'];
    const title = new DynamicTitle(countries, months);
    const andCount = (title.value.match(/\sand\s/g) || []).length;
    expect(andCount).toBe(1);
  });

  it('should add commas between all countries besides last two ones', function () {
    const countries: String[] = ['Poland', 'Germany', 'Germany', 'Poland', 'USA'];
    const months: String[] = ['January'];
    const title = new DynamicTitle(countries, months);
    const commaCount = (title.value.match(/,/g) || []).length;
    expect(commaCount).toBe(1);
  });

  it('should include \'and other\' if there are more than 4 countries', function () {
    const countries: String[] = ['Poland', 'Germany', 'UK', 'France', 'USA'];
    const months: String[] = ['January'];
    const title = new DynamicTitle(countries, months);

    const commaCount = (title.value.match(/\sand\sother/g) || []).length;
    expect(commaCount).toBe(1);
  });
});