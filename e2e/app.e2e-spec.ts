import { EnergyConsumptionPage } from './app.po';

describe('energy-consumption App', () => {
  let page: EnergyConsumptionPage;

  beforeEach(() => {
    page = new EnergyConsumptionPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
