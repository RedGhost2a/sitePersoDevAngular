import { TestBed } from '@angular/core/testing';

import { FormulaireDeContactService } from './formulaire-de-contact.service';

describe('FormulaireDeContactService', () => {
  let service: FormulaireDeContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaireDeContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
