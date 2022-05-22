import { TestBed } from '@angular/core/testing';

import { blogService } from './blog.service';

describe('blogService', () => {
  let service: blogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(blogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
