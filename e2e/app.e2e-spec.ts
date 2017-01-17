import { FssecondPage } from './app.po';

describe('fssecond App', function() {
  let page: FssecondPage;

  beforeEach(() => {
    page = new FssecondPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
