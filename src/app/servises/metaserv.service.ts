import { Injectable, PLATFORM_ID, Inject , Renderer2, RendererFactory2} from '@angular/core';
 
import { DOCUMENT } from '@angular/common'
@Injectable({
  providedIn: 'root',
})
export class MetaservService {
  private renderer: Renderer2;
  constructor(
   @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
  ) {this.renderer = rendererFactory.createRenderer(null, null);}

  




  addOrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://arapov.trade/#organization',          // ← связка с publisher статей
      name: 'Arapov.Trade',                                  // ← единое имя (было 'Arapov Trade')
      alternateName: 'Навчання трейдингу від Ігоря Арапова',
      legalName: 'ФОП Арапов І.В.',
      taxID: '3314507171',
      url: 'https://arapov.trade',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/favicon.ico',
        width: 200,
        height: 200,
      },
      image: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
      email: 'arapov.trade@gmail.com',
      telephone: '+380502933075',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'вул. Усенко, д. 9',
        addressLocality: 'Дніпро',
        addressRegion: 'Дніпропетровська область',
        postalCode: '49130',
        addressCountry: 'UA',
      },
      founder: { '@id': 'https://arapov.trade/#person' },    // ← привязка к каноническому Person
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+380502933075',
        contactType: 'customer service',
        areaServed: 'UA',
        availableLanguage: ['Russian', 'Ukrainian', 'English'],
      },
    };

    // Снимаем старый Organization-узел, если он уже есть (и на сервере, и в браузере)
    const existing = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    existing.forEach((script) => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'Organization') {
          this.renderer.removeChild(script.parentNode, script);
        }
      } catch (e) {
        /* невалидный JSON игнорируем */
      }
    });

    // Выводим настоящий JSON-LD <script> ВСЕГДА — и на сервере (SSG), и в браузере
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }
}
