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
  selector: 'app-home-ru-blog-twenty',
  templateUrl: './home-ru-blog-twenty.component.html',
  styleUrl: './home-ru-blog-twenty.component.scss',
})
export class HomeRuBlogTwentyComponent implements OnInit {
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
    this.titleService.setTitle(
      'Хранение криптовалюты: кошельки и безопасность | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как безопасно хранить криптовалюту: горячие и холодные кошельки, сид-фраза, аппаратные кошельки и правила защиты активов от кражи.',
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
          headline: 'Хранение крипты безопасно: где держать монеты в 2026 году',
          description:
            'Как безопасно хранить криптовалюту: горячие и холодные кошельки, сид-фраза, аппаратные кошельки и правила защиты активов от кражи.',
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
            '@id': 'https://arapov.trade/ru/freestudying/crypto-storage',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostoring44.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюты',
          keywords:
            'хранение криптовалюты, холодный кошелёк, аппаратный кошелёк, сид-фраза, холодное хранение',
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
          name: 'Где безопаснее всего хранить криптовалюту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основной капитал безопаснее держать в холодном кошельке без подключения к интернету, лучше на отдельном аппаратном устройстве. На бирже стоит оставлять только то, чем вы торгуете прямо сейчас, потому что там ключи принадлежат не вам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем горячий кошелёк отличается от холодного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Горячий кошелёк подключён к интернету и удобен для частых операций, но из-за связи с сетью уязвим к взломам и фишингу. Холодный держит ключи офлайн и защищён от удалённых атак, зато для повседневной торговли неудобен.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли фотографировать сид-фразу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет. Сид-фраза должна жить только офлайн. Фото в галерее, скриншот, заметка в облаке или сообщение самому себе в мессенджере это прямой путь к краже, потому что любой такой файл может утечь.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое вредоносный апрув и зачем отзывать разрешения?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Подключаясь к приложению в сети, вы подписываете разрешение распоряжаться вашими токенами. Мошеннический сайт прячет за обычной кнопкой разрешение без лимита и потом опустошает кошелёк. Поэтому стоит периодически проверять и отзывать старые разрешения через сервисы вроде Revoke.cash и никогда не подписывать то, чего не понимаете.',
          },
        },
        {
          '@type': 'Question',
          name: 'Безопасно ли хранить криптовалюту на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Только для активной торговли и небольших сумм. На бирже монеты по сути вам не принадлежат, ключами распоряжается площадка, а её могут взломать или заморозить вывод, что в истории крипты случалось не раз.',
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
      '@id': 'https://arapov.trade/ru/freestudying/crypto-storage#howto',
      name: 'Как безопасно хранить криптовалюту',
      description:
        'Пошаговый разбор: какой кошелёк выбрать, как защитить сид-фразу и где держать основной капитал',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь, чем горячий кошелёк отличается от холодного',
          text: 'Криптовалютный кошелёк — это хранилище не самих монет, а ключей к ним, и этот момент новички пропускают чаще всего.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите для долгого хранения аппаратный кошелёк',
          text: 'Аппаратный кошелёк — это небольшое физическое устройство, созданное только для хранения ключей офлайн, и самый практичный вид холодного хранения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Защитите сид-фразу и держите её только офлайн',
          text: 'Сид-фраза — это набор из 12 или 24 слов, по которому кошелёк восстанавливается на любом совместимом устройстве.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разделите биржевой и сберегательный кошелёк',
          text: 'Когда монеты лежат на бирже, ключами распоряжается она, а не вы.',
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
          name: 'Криптовалютный кошелёк',
          description:
            'Это хранилище не самих монет, а ключей к ним; сами монеты всегда находятся в блокчейне, а кошелёк держит закрытый ключ, который подтверждает, что они ваши.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аппаратный кошелёк',
          description:
            'Это небольшое физическое устройство, созданное только для хранения ключей офлайн; приватный ключ никогда не покидает устройство, а транзакция подписывается внутри него.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сид-фраза',
          description:
            'Это набор из 12 или 24 слов, который полностью восстанавливает доступ к кошельку на любом совместимом устройстве; по сути это деньги в текстовом виде.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
