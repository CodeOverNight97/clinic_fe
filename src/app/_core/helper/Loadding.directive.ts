import { Directive, Input, ElementRef, Renderer2, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[isLoading]',
})
export class LoadingDirective implements OnInit, OnChanges {
  @Input('isLoading') isLoading: boolean;
  @HostBinding('class.p-relative') get isRelative(): boolean {
    return this.isLoading;
  }
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading'].currentValue) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
  }

  ngOnInit(): void {
    console.log('rr')
    if (this.isLoading) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
  }

  private showLoading(): void {
    const loadingDiv = this.renderer.createElement('div');
    this.renderer.addClass(loadingDiv, 'loading');
    this.renderer.appendChild(this.el.nativeElement, loadingDiv);
  }

  private hideLoading(): void {
    const loadingDiv = this.el.nativeElement.querySelector('.loading');
    if (loadingDiv) {
      this.renderer.removeChild(this.el.nativeElement, loadingDiv);
    }
  }
}