import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoKetXuatDuLieuComponent } from './bao-cao-ket-xuat-du-lieu.component';

describe('BaoCaoKetXuatDuLieuComponent', () => {
  let component: BaoCaoKetXuatDuLieuComponent;
  let fixture: ComponentFixture<BaoCaoKetXuatDuLieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaoCaoKetXuatDuLieuComponent]
    });
    fixture = TestBed.createComponent(BaoCaoKetXuatDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
