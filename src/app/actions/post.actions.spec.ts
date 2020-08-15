import * as fromPost from './post.actions';

describe('loadPosts', () => {
  it('should return an action', () => {
    expect(fromPost.loadPosts().type).toBe('[Post] Load Posts');
  });
});
