import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetNhapDuLieuComponent } from './ket-nhap-du-lieu.component';

describe('KetNhapDuLieuComponent', () => {
  let component: KetNhapDuLieuComponent;
  let fixture: ComponentFixture<KetNhapDuLieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KetNhapDuLieuComponent]
    });
    fixture = TestBed.createComponent(KetNhapDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
