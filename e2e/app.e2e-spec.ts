import { TodoAppCiPage } from './app.po';

describe('todo-app-ci App', () => {
  let page: TodoAppCiPage;

  beforeEach(() => {
    page = new TodoAppCiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
