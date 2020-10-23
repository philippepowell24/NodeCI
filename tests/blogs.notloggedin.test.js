const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('when user is not logged in', async () => {
  const actions = [
    {
      method: 'get',
      path: '/api/blogs',
    },
    {
      method: 'post',
      path: '/api/blogs',
      data: {
        title: 'T',
        content: 'C',
      },
    },
  ];

  test.only('blog related actions are prohibited', async () => {
    const results = await page.execRequests(actions);

    for (let result of results) {
      expect(result).toEqual({ error: 'You must log in!' });
    }
  });

  test('user cannot create blog posts', async () => {
    const result = await page.post('/api/blogs', {
      title: 'My Title',
      content: 'My Content',
    });

    expect(result).toEqual({ error: 'You must log in!' });
  });

  test('user cannot get a list of posts', async () => {
    const result = await page.get('/api/blogs');

    expect(result).toEqual({ error: 'You must log in!' });
  });
});
