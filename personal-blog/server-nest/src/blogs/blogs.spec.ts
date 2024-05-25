import { Test, TestingModule } from '@nestjs/testing';
import { Blogs } from './blogs';

describe('Blogs', () => {
  let provider: Blogs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Blogs],
    }).compile();

    provider = module.get<Blogs>(Blogs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
