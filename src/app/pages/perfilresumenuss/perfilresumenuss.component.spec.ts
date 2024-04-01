import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilresumenussComponent } from './perfilresumenuss.component';

describe('PerfilresumenussComponent', () => {
  let component: PerfilresumenussComponent;
  let fixture: ComponentFixture<PerfilresumenussComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilresumenussComponent]
    });
    fixture = TestBed.createComponent(PerfilresumenussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
