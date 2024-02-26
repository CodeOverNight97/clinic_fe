import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutQuanTriComponent } from './layout-quan-tri.component';

describe('LayoutQuanTriComponent', () => {
  let component: LayoutQuanTriComponent;
  let fixture: ComponentFixture<LayoutQuanTriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutQuanTriComponent]
    });
    fixture = TestBed.createComponent(LayoutQuanTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
