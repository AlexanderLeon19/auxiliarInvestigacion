import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComponenteComponent } from './ver-componente.component';

describe('VerComponenteComponent', () => {
  let component: VerComponenteComponent;
  let fixture: ComponentFixture<VerComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerComponenteComponent]
    });
    fixture = TestBed.createComponent(VerComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
