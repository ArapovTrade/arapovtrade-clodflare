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
  selector: 'app-home-ru-blog-thirty-two',
  templateUrl: './home-ru-blog-thirty-two.component.html',
  styleUrl: './home-ru-blog-thirty-two.component.scss',
})
export class HomeRuBlogThirtyTwoComponent implements OnInit {
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

    this.titleService.setTitle('Как работает биржа | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое биржа, какие бывают виды и функции, как устроены торги и чем биржевой рынок отличается от внебиржевого. Гайд для новичка.',
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
            'Как устроена биржа простыми словами: рынок, цена, стакан и клиринг',
          description:
            'Что такое биржа, какие бывают виды и функции, как устроены торги и чем биржевой рынок отличается от внебиржевого. Гайд для новичка.',
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
            '@id': 'https://arapov.trade/ru/freestudying/how-exchange-works',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/how-exchange-works.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Биржа',
          keywords:
            'биржа, брокер, биржевой стакан, клиринг, формирование цены, акция, торговые сессии',
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
          name: 'Чем биржа отличается от брокера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржа это сама торговая площадка, где сводятся сделки и формируется цена. Брокер это посредник, через которого частный трейдер получает к ней доступ. То есть торгуете вы на бирже, но через брокера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как формируется цена на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цену определяет баланс спроса и предложения. Когда покупатели активнее, цена растёт, когда давят продавцы, падает. Текущая цена это цена последней сделки, в которой сошлись покупатель и продавец, а не назначенное кем-то число.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое биржевой стакан?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это таблица всех текущих заявок на покупку и продажу, карта спроса и предложения в реальном времени. Лимитные ордера стоят в стакане и ждут контрагента, а рыночные исполняются сразу и двигают цену, проедая ликвидность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Зачем нужна клиринговая палата?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Она встаёт между покупателем и продавцом и гарантирует исполнение сделки, снимая риск, что вторая сторона не расплатится. Благодаря клирингу на регулируемой бирже виден честный объём, а сделки сводятся прозрачно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое акция простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это ценная бумага, дающая владельцу долю в компании. Купив акцию, вы становитесь совладельцем бизнеса и получаете право на часть его прибыли и, как правило, право голоса на собрании акционеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'В какое время лучше торговать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Самое ликвидное время это пересечение европейской и американской сессий, ближе к середине дня по Европе. Тогда в рынке максимум участников. В моменты выхода важных новостей входить новичку рискованно из-за хаотичных движений.',
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
      '@id': 'https://arapov.trade/ru/freestudying/how-exchange-works#howto',
      name: 'Как разобраться в устройстве биржи',
      description:
        'Пошаговый разбор того, как устроен биржевой рынок и как это применять в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Различайте биржу и брокера',
          text: 'Биржа это централизованная площадка, где сводятся сделки, а брокер это посредник, через которого частный трейдер получает к ней доступ.',
        },
        {
          '@type': 'HowToStep',
          name: 'Знайте участников: крупный капитал и толпа',
          text: 'На бирже сходятся крупный капитал (банки и фонды) и розничная толпа, а доступ и ликвидность обеспечивают брокер, маркетмейкер и клиринговая палата; задача в том, чтобы по объёму видеть сторону крупного капитала.',
          position: 2,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Поймите, что такое акция',
          text: 'Акция это базовый инструмент рынка, доля в компании, цену которой в моменте двигают спрос и предложение, а не качество бизнеса.',
        },
        {
          '@type': 'HowToStep',
          name: 'Разберитесь, какие активы торгуются и где',
          text: 'Через биржу торгуют акции, облигации, фьючерсы, сырьё и валюту при одном устройстве рынка, поэтому начинайте с одного инструмента; часть рынка внебиржевая, как Форекс, где единого честного объёма нет.',
          position: 4,
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Разберитесь, как рождается цена',
          text: 'Биржевая цена это цена последней сделки, рождённая балансом спроса и предложения, а не назначенная сверху.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте стакан и виды ордеров',
          text: 'Биржевой стакан это карта спроса и предложения, где лимитные ордера ждут, а рыночные двигают цену, проедая ликвидность.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Поймите роль клиринга и объёма',
          text: 'Клиринговая палата гарантирует расчёты, поэтому данным по объёму с регулируемой биржи можно доверять, и на этом строится объёмный анализ.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Выбирайте время для торговли',
          text: 'Рынок живёт неравномерно в течение суток, и самое ликвидное окно это пересечение европейской и американской сессий.',
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
          name: 'Биржа',
          description:
            'Централизованная торговая площадка, где по единым правилам встречаются покупатели и продавцы, а цена формируется открыто через аукцион заявок в стакане.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Акция',
          description:
            'Ценная бумага, которая закрепляет за владельцем долю в компании и право на часть её прибыли и имущества.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Биржевая цена',
          description:
            'Цена последней сделки, в которой сошлись покупатель и продавец; она рождается из баланса спроса и предложения, а не назначается сверху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Клиринговая палата',
          description:
            'Посредник, который встаёт между покупателем и продавцом и гарантирует, что обе стороны исполнят обязательства по сделке.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'институциональные инвесторы',
          description:
            'Крупный профессиональный участник рынка, такой как банк или фонд, с большим капиталом, аналитикой и дисциплиной; в отличие от розничной толпы способен заметно влиять на цену.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Внебиржевой рынок',
          description:
            'Сделки напрямую между участниками без единой централизованной площадки и общего стакана; пример это валютный рынок Форекс, где единого честного объёма по всему рынку нет.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
