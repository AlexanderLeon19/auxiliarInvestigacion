import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComponenteComponent } from './editar-componente.component';

describe('EditarComponenteComponent', () => {
  let component: EditarComponenteComponent;
  let fixture: ComponentFixture<EditarComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarComponenteComponent]
    });
    fixture = TestBed.createComponent(EditarComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
