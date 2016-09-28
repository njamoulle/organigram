import { TestOrganigramPage } from './app.po';

describe('test-organigram App', function() {
  let page: TestOrganigramPage;

  beforeEach(() => {
    page = new TestOrganigramPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
