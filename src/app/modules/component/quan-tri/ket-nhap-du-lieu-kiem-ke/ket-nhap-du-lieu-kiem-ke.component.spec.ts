import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetNhapDuLieuKiemKeComponent } from './ket-nhap-du-lieu-kiem-ke.component';

describe('KetNhapDuLieuKiemKeComponent', () => {
  let component: KetNhapDuLieuKiemKeComponent;
  let fixture: ComponentFixture<KetNhapDuLieuKiemKeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KetNhapDuLieuKiemKeComponent]
    });
    fixture = TestBed.createComponent(KetNhapDuLieuKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
