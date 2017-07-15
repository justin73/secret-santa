import { MySecretSantaPage } from './app.po';

describe('my-secret-santa App', () => {
  let page: MySecretSantaPage;

  beforeEach(() => {
    page = new MySecretSantaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
