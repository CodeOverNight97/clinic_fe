import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoKetNhapKiemKeComponent } from './BaoCaoKetNhapKiemKeComponent';

describe('BaoCaoKetNhapKiemKeComponent', () => {
  let component: BaoCaoKetNhapKiemKeComponent;
  let fixture: ComponentFixture<BaoCaoKetNhapKiemKeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaoCaoKetNhapKiemKeComponent]
    });
    fixture = TestBed.createComponent(BaoCaoKetNhapKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
