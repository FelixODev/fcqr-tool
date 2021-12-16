import { TestBed } from '@angular/core/testing';

import { QrResolver } from './qr.resolver';

describe('QrResolver', () => {
  let resolver: QrResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QrResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
