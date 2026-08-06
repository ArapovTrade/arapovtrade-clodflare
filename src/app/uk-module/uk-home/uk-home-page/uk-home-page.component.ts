import {
  Component,
  Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uk-home-page',
  templateUrl: './uk-home-page.component.html',
  styleUrl: './uk-home-page.component.scss',
})
export class UkHomePageComponent implements OnInit {
  private renderer: Renderer2;

  constructor(
    private meta: Meta,
    private router: Router,

    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  ngOnInit(): void {
    this.titleService.setTitle('Авторське навчання трейдингу');
     
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторські ⏩ курси трейдингу від Ігоря Арапова. ⭐ Навчання трейдингу онлайн з нуля від ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курси трейдингу, трейдинг, валюти, навчання трейдингу, безкоштовне навчання трейдингу, навчання трейдингу безкоштовно, навчання трейдингу криптовалют, трейдинг курси безкоштовно, трейдинг з нуля, курси по трейдингу',
    });
  }

  setCanonicalURL(url: string) {
    const canURL = url === undefined ? window.location.href : url;
    
    const link: HTMLLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url); // Ошибка возникает здесь, если url может быть undefined
    const head = this.document.getElementsByTagName('head')[0];
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      this.renderer.removeChild(head, existingLink);
    }
    this.renderer.appendChild(head, link);
  }

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToStudy() {
    this.router.navigateByUrl('/uk/studying');
  }
}
