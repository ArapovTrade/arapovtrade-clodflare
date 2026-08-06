import { Directive, ElementRef, Input, OnInit, OnChanges, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[lazyBackground]' 
})
export class BgImgDirective implements OnInit, OnChanges {
  @Input() lazyBackground!: string;

  private isLoaded = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object  // ← инжектим платформу
  ) {}

  ngOnInit() {
    // ← проверяем что мы в браузере, а не на сервере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.applyBg();
          this.isLoaded = true;
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }

  ngOnChanges() {
    if (this.isLoaded) {
      this.applyBg();
    }
  }

  private applyBg() {
    this.el.nativeElement.style.backgroundImage = `url(${this.lazyBackground})`;
    this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
    this.el.nativeElement.style.backgroundPosition = 'center';
  }
}