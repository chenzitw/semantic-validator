import { op, is } from 'semantic-validator';

describe('normal case 01', (): void => {
  const validator = op.every(
    op.shape({
      id: is.integer(),
      content: is.string(),
      attachement: op.or(
        is.nul(),
        op.exact({
          type: is.same('image'),
          url: is.string(),
        }),
        op.exact({
          type: is.same('location'),
          coordinates: op.exact({
            lat: op.and(
              is.float(),
              is.atLeast(-90),
              is.atMost(90),
            ),
            lng: op.and(
              is.float(),
              is.atLeast(-180),
              is.atMost(180),
            ),
          }),
        }),
      ),
      createdAt: is.date(),
    }),
  );

  it('should return true when posts are valid', (): void => {
    const posts = [
      {
        id: 10000001,
        content: 'some-content',
        author: 'User One',
        attachement: {
          type: 'image',
          url: 'http://image.com/image-0001.jpg',
        },
        createdAt: new Date('2019-06-23T08:24:00Z'),
      },
      {
        id: 10000002,
        content: 'some-content',
        author: 'User Two',
        attachement: {
          type: 'location',
          coordinates: {
            lat: 25.061027,
            lng: 121.5289492,
          },
        },
        createdAt: new Date('2019-06-23T08:25:00Z'),
        notImportantProp: 'not-important-value',
      },
      {
        id: 10000003,
        content: 'some-content',
        author: 'User Three',
        attachement: null,
        createdAt: new Date('2019-06-23T08:26:00Z'),
        notImportantProp: 'not-important-value',
      },
    ];

    expect(validator(posts)).toBe(true);
  });

  it('should return false when posts are invalid', (): void => {
    const posts = [
      {
        id: 10000001,
        content: 'some-content',
        author: 'User One',
        attachement: {
          type: 'location',
          url: 'http://image.com/image-0001.jpg',
        },
        createdAt: new Date('2019-06-23T08:24:00Z'),
      },
    ];

    expect(validator(posts)).toBe(false);
  });
});
