import { SisColoursPage } from './app.po';

describe('sis-colours App', () => {
  let page: SisColoursPage;

  beforeEach(() => {
    page = new SisColoursPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
