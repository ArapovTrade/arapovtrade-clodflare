import {
  Injectable,
  PLATFORM_ID,
  Inject,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class MetaservService {
  private renderer: Renderer2;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addOrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://arapov.trade/#organization', // ← связка с publisher статей
      name: 'ArapovTrade', // ← единое имя (было 'Arapov Trade')
      alternateName: ['arapov.trade', 'Arapov.Trade', 'Arapov Trade'],

      legalName: 'ФОП Арапов І.В.',
      taxID: '3314507171',
      url: 'https://arapov.trade',
      sameAs: [
        'https://www.wikidata.org/wiki/Q140744162',
        'https://www.linkedin.com/company/arapovtrade',
        'https://wellfound.com/company/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
      ],
      // ← мост к платформе в Wikidata
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://arapov.trade/#logo',
        url: 'https://arapov.trade/favicon.ico',
        contentUrl: 'https://arapov.trade/favicon.ico',
        width: 200,
        height: 200,
        caption: 'ArapovTrade',
      },

      description:
        'ArapovTrade is a free multilingual educational platform focused on trading, financial markets, investment analysis, risk management, behavioral finance, and trading psychology.',

      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
      },

      email: 'arapov.trade@gmail.com',
      telephone: '+380502933075',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Uria Lipi St. 9',
        addressLocality: 'Dnipro',
        addressRegion: 'Dnipropetrovsk Oblast',
        postalCode: '49130',
        addressCountry: 'UA',
      },
      founder: { '@id': 'https://arapov.trade/#person' }, // ← привязка к каноническому Person
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 10,
      },

      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+380502933075',
        email: 'arapov.trade@gmail.com',
        contactType: 'customer service',
        areaServed: 'Worldwide',
        availableLanguage: ['uk', 'en', 'ru'],
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
