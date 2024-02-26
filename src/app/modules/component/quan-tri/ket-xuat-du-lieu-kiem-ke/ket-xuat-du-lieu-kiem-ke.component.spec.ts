import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetXuatDuLieuKiemKeComponent } from './ket-xuat-du-lieu-kiem-ke.component';

describe('KetXuatDuLieuKiemKeComponent', () => {
  let component: KetXuatDuLieuKiemKeComponent;
  let fixture: ComponentFixture<KetXuatDuLieuKiemKeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KetXuatDuLieuKiemKeComponent]
    });
    fixture = TestBed.createComponent(KetXuatDuLieuKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
