import { AsquarePage } from './app.po';

describe('asquare App', () => {
  let page: AsquarePage;

  beforeEach(() => {
    page = new AsquarePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
