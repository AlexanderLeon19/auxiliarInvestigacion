import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComponenteComponent } from './crear-componente.component';

describe('CrearComponenteComponent', () => {
  let component: CrearComponenteComponent;
  let fixture: ComponentFixture<CrearComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearComponenteComponent]
    });
    fixture = TestBed.createComponent(CrearComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
