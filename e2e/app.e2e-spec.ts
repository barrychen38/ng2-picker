import { Ng2PickerPage } from './app.po';

describe('ng2-picker App', () => {
  let page: Ng2PickerPage;

  beforeEach(() => {
    page = new Ng2PickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
