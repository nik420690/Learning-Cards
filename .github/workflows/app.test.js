const { chromium } = require('playwright');

describe('Electron App Tests', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should display the application title', async () => {
    const title = await page.title();
    expect(title).toBe('Electron App');
  });

  it('should display the correct number of items', async () => {
    const items = await page.$$('.item');
    expect(items.length).toBe(3);
  });

  it('should add a new item when the form is submitted', async () => {
    const form = await page.$('form');
    await form.fill({
      '#name': 'New Item',
      '#description': 'This is a new item',
    });
    await form.submit();
    const items = await page.$$('.item');
    expect(items.length).toBe(4);
  });
});