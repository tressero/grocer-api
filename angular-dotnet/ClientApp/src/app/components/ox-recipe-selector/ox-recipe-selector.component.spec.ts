import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxRecipeSelectorComponent } from './ox-recipe-selector.component';

describe('OxRecipeSelectorComponent', () => {
  let component: OxRecipeSelectorComponent;
  let fixture: ComponentFixture<OxRecipeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxRecipeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OxRecipeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
