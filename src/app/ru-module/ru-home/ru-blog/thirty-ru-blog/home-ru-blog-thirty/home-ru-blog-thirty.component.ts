import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-thirty',
  templateUrl: './home-ru-blog-thirty.component.html',
  styleUrl: './home-ru-blog-thirty.component.scss',
})
export class HomeRuBlogThirtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle('Деривативы, фьючерсы и спот | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое деривативы, чем фьючерсы и опционы отличаются от спота, как работает плечо и какой инструмент выбрать новичку.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
      queryParams: { group: value },
    });

    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;

  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsRus.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';

  onFocus() {
    this.isFocused = true;

    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5,
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }

  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }
  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline:
            'Фьючерсы, деривативы и спот: чем отличаются и что выбрать новичку',
          description:
            'Что такое деривативы, чем фьючерсы и опционы отличаются от спота, как работает плечо и какой инструмент выбрать новичку.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/ru/freestudying/derivatives-futures-spot',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/derivatives-futures-spot.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Словарь трейдера',
          keywords:
            'деривативы, фьючерс, спот, фьючерсы против спота, кредитное плечо, расчётный фьючерс',
          inLanguage: 'ru',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое деривативы простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это производные контракты, цена которых зависит от базового актива: акции, валюты, нефти, золота или индекса. Сам актив вы не покупаете, вы торгуете договором на него, который дорожает или дешевеет вместе с этим активом. К деривативам относят фьючерсы и опционы на бирже, а также внебиржевые форварды и свопы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое фьючерс и к чему он обязывает?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фьючерс это стандартизированный биржевой контракт, обязывающий одну сторону купить, а другую продать актив по заранее оговорённой цене к определённой дате. Между сторонами стоит клиринговая палата. Большинство фьючерсов расчётные, поэтому никакого вагона нефти никто не везёт: в дату экспирации стороны просто рассчитываются деньгами, а спекулянт обычно закрывает позицию раньше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем спот отличается от фьючерса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На споте вы покупаете сам актив здесь и сейчас и владеете им без плеча, поэтому потерять можете максимум вложенное и ликвидации там нет. Фьючерс это контракт на цену с плечом: активом вы не владеете, за удержание платите, а при движении против вас залога может не хватить и позицию закроют принудительно. Купили биткоин на споте за сто тысяч, упал до восьмидесяти, вы спокойно ждёте; на фьючерсе с плечом та же просадка скорее всего уже ликвидировала бы вас.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему фьючерсы опасны для новичка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Из-за встроенного плеча. Вы вносите лишь маржу, малую долю контракта, но прибыль и убыток считаются от полного размера контракта. Движение цены на пару процентов против вас способно съесть куда больше тех же процентов от депозита, плюс ежедневная переоценка, маржин-колл и принудительное закрытие. На крипто-фьючерсах волатильность ещё выше из-за притока спекулятивных денег.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что выбрать новичку: спот или фьючерсы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту начинать стоит со спота: там нет плеча, нет ликвидации и нельзя потерять больше вложенного, поэтому вы спокойно учитесь читать рынок. К фьючерсам разумно переходить позже, уже понимая плечо, маржу и ликвидацию и держа риск под контролем. Правило простое: купить и держать активом на месяцы это спот, нужен шорт, гибкость и честный биржевой объём это фьючерс.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id':
        'https://arapov.trade/ru/freestudying/derivatives-futures-spot#howto',
      name: 'Как разобраться в деривативах, фьючерсах и споте',
      description:
        'Пошаговый разбор производных инструментов, фьючерса и спота и их практическое применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое дериватив',
          text: 'Дериватив это производный контракт, цена которого зависит от базового актива, поэтому вы торгуете не сам актив, а договор на него.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь, как устроен фьючерс',
          text: 'Фьючерс это стандартизированный обязывающий биржевой контракт через клиринговую палату, и большинство фьючерсов расчётные, без физической поставки.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Сравните спот и фьючерс',
          text: 'На споте вы владеете активом без плеча и ликвидации, на фьючерсе торгуете контрактом на цену с плечом и риском принудительного закрытия.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Осознайте, почему фьючерсы опасны для новичка',
          text: 'Маржа мала, но прибыль и убыток считаются от полного контракта, а ежедневная переоценка и маржин-колл способны закрыть позицию принудительно.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Выберите инструмент под свою задачу',
          text: 'Новичку безопаснее начать со спота без плеча, а к фьючерсам переходить осознанно, поняв плечо, маржу и ликвидацию.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Глоссарий терминов статьи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Дериватив',
          description:
            'Производный финансовый инструмент, стоимость которого привязана к цене другого, базового актива: акции, валюты, товара, индекса или ставки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фьючерс',
          description:
            'Стандартизированный биржевой контракт, обязывающий одну сторону купить, а другую продать актив по заранее оговорённой цене к определённой дате в будущем.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спот',
          description:
            'Рынок, на котором сделка проходит здесь и сейчас, а покупатель сразу получает сам актив в собственность без плеча.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
