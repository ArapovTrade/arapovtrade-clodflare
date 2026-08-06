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
  selector: 'app-home-ru-thirty-three',
  templateUrl: './home-ru-thirty-three.component.html',
  styleUrl: './home-ru-thirty-three.component.scss',
})
export class HomeRuThirtyThreeComponent implements OnInit {
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
      'Реквоты в трейдинге: что это и как избежать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Реквоты в трейдинге — полное руководство для начинающих трейдеров. Узнайте причины возникновения реквотов, их влияние на торговлю и эффективные методы минимизации.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/requotes.webp',
    });
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
          headline: 'Реквоты в трейдинге: что это и как избежать',
          description:
            'Полное руководство по реквотам для начинающих трейдеров. Причины возникновения, влияние на торговлю и методы минимизации.',
          image: 'https://arapov.trade/assets/img/content/requotes.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/requotes',
          },
          articleSection: 'Трейдинг для начинающих',
          keywords: [
            'реквоты',
            'requote',
            'исполнение ордеров',
            'брокер',
            'волатильность',
          ],
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
          name: 'Что такое реквот в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Реквот (requote) — это ситуация, когда брокер не может исполнить ордер по запрошенной цене и предлагает трейдеру новую цену для подтверждения. Это происходит из-за быстрого изменения рыночных котировок между моментом отправки ордера и его обработкой на сервере.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему возникают реквоты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные причины реквотов: высокая волатильность рынка во время выхода новостей, задержки интернет-соединения, медленная обработка ордеров брокером, низкая ликвидность торгового инструмента и тип исполнения ордеров (Dealing Desk брокеры чаще выдают реквоты).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как избежать реквотов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для минимизации реквотов рекомендуется: выбирать ECN/STP брокеров с быстрым исполнением, использовать отложенные ордера вместо рыночных, избегать торговли во время выхода важных новостей, улучшить интернет-соединение или использовать VPS-сервер вблизи серверов брокера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем реквот отличается от проскальзывания?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Реквот — это запрос на подтверждение новой цены перед исполнением ордера, трейдер может отказаться от сделки. Проскальзывание (slippage) — это автоматическое исполнение ордера по другой цене без запроса подтверждения. При реквоте у трейдера есть выбор, при проскальзывании сделка уже исполнена.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой брокер лучше для минимизации реквотов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для минимизации реквотов выбирайте ECN или STP брокеров с прямым доступом к межбанковскому рынку. Проверяйте наличие лицензии регулятора (FCA, ASIC, CySEC), изучайте отзывы о скорости исполнения и тестируйте платформу на демо-счёте перед реальной торговлей.',
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
      name: 'Как минимизировать реквоты в трейдинге',
      description:
        'Пошаговое руководство по снижению частоты реквотов при торговле на финансовых рынках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите надёжного брокера',
          text: 'Изучите репутацию брокера, проверьте наличие лицензии регулятора и выберите ECN или STP счёт с прямым доступом к рынку для быстрого исполнения ордеров.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Используйте отложенные ордера',
          text: 'Вместо рыночных ордеров применяйте лимитные и стоп-ордера, которые исполняются автоматически при достижении заданной цены без запроса подтверждения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оптимизируйте интернет-соединение',
          text: 'Используйте проводное подключение вместо Wi-Fi, рассмотрите аренду VPS-сервера вблизи дата-центра брокера для минимизации задержек передачи данных.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Избегайте торговли во время новостей',
          text: 'Отслеживайте экономический календарь и воздерживайтесь от открытия позиций за 5-10 минут до и после выхода важных экономических данных с высокой волатильностью.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Выбирайте оптимальное время для торговли',
          text: 'Торгуйте в периоды высокой ликвидности — во время пересечения европейской и американской сессий, избегая ночных часов и праздничных дней с низкой активностью.',
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
      name: 'Глоссарий терминов трейдинга: реквоты',
      description:
        'Основные термины, связанные с реквотами и исполнением ордеров в трейдинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Реквот',
          description:
            'Повторный запрос цены от брокера, когда первоначальная цена ордера уже недоступна из-за изменения рыночных котировок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Статистический показатель интенсивности колебаний цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка быстро исполнять крупные ордера без существенного влияния на текущую цену актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN-брокер',
          description:
            'Брокер с электронной коммуникационной сетью, обеспечивающий прямой доступ к межбанковскому рынку без посредников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dealing Desk',
          description:
            'Модель работы брокера, при которой компания сама выступает контрагентом в сделках клиентов и обрабатывает ордера внутри',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой ценой исполнения ордера и фактической ценой, по которой сделка была совершена',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VPS-сервер',
          description:
            'Виртуальный выделенный сервер, используемый трейдерами для размещения торговых терминалов вблизи серверов брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Отложенный ордер',
          description:
            'Торговый приказ на покупку или продажу актива по заранее указанной цене, который активируется автоматически при достижении этой цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и ценой продажи (Bid) финансового инструмента, комиссия брокера за исполнение сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём одновременного выставления котировок на покупку и продажу актива',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
