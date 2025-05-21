import { ResHandlerMiddleware } from './res-handler.middleware';

describe('ResHandlerMiddleware', () => {
  it('should be defined', () => {
    expect(new ResHandlerMiddleware()).toBeDefined();
  });
});
