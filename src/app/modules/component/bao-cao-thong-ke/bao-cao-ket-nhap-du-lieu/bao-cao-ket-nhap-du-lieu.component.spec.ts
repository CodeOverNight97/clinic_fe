import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoKetNhapDuLieuComponent } from './bao-cao-ket-nhap-du-lieu.component';

describe('BaoCaoKetNhapDuLieuComponent', () => {
  let component: BaoCaoKetNhapDuLieuComponent;
  let fixture: ComponentFixture<BaoCaoKetNhapDuLieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaoCaoKetNhapDuLieuComponent]
    });
    fixture = TestBed.createComponent(BaoCaoKetNhapDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
