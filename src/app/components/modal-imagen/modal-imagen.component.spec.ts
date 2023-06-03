import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagenComponent } from './modal-imagen.component';

describe('ModalImagenComponent', () => {
  let component: ModalImagenComponent;
  let fixture: ComponentFixture<ModalImagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalImagenComponent]
    });
    fixture = TestBed.createComponent(ModalImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
