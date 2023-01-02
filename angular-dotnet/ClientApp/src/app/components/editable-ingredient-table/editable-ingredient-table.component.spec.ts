import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditableIngredientTableComponent } from './editable-ingredient-table.component';

describe('EditableIngredientTableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        EditableIngredientTableComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditableIngredientTableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

/*  it(`should have as title 'angular-editable-table'`, () => {
    const fixture = TestBed.createComponent(EditableIngredientTableComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-editable-table');
  });*/

  it('should render title', () => {
    const fixture = TestBed.createComponent(EditableIngredientTableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-editable-table app is running!');
  });
});
