import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseFormComponent } from './create-expense-form.component';

describe('CreateExpenseFormComponent', () => {
  let component: CreateExpenseFormComponent;
  let fixture: ComponentFixture<CreateExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExpenseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
