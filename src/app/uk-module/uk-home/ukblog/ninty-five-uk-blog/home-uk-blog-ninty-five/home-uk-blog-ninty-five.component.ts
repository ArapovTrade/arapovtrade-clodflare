import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-ninty-five',
  templateUrl: './home-uk-blog-ninty-five.component.html',
  styleUrl: './home-uk-blog-ninty-five.component.scss',
})
export class HomeUkBlogNintyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Торгівля золотом XAUUSD | Повний посібник трейдера',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгівля золотом XAUUSD: фундаментальні фактори, технічний аналіз, стратегії та управління ризиками для трейдерів дорогоцінних металів.',
    });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          headline: 'Торгівля золотом XAUUSD: Аналіз ринку та стратегії',
          description:
            'Повний посібник з торгівлі золотом: фундаментальні драйвери, технічний аналіз та управління ризиками',
          image: 'https://arapov.trade/assets/img/content/goldtrading1.jpg',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-04T00:00:00+02:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/goldtrading',
          },
          inLanguage: 'uk',
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Що означає XAUUSD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'XAUUSD — торговий символ золота в доларах США. XAU — міжнародний код золота, USD — долар. Котирування показує ціну тройської унції (31.1 грама) в доларах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які фактори впливають на ціну золота?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові драйвери: політика ФРС, курс долара, інфляційні очікування, геополітична напруга, попит центробанків, реальні процентні ставки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли найкраще торгувати золотом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пікова ліквідність — перетин лондонської та нью-йоркської сесій (16:00-20:00 за Києвом). Волатильність зростає при виході даних США та рішеннях FOMC.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому золото вважається захисним активом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Золото зберігає цінність тисячоліттями, не має контрагентного ризику, історично захищає від знецінення валют. Під час криз капітал перетікає в золото.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ризик рекомендується для торгівлі золотом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Через волатильність рекомендується 0.5-1% ризику на угоду. Стоп-лоси мають бути ширшими ніж для форекс-пар, враховуючи денні діапазони $20-50.',
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
      name: 'Як почати торгувати золотом XAUUSD',
      description: 'Покрокова методологія торгівлі золотом',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть фундамент',
          text: 'Розберіться в драйверах: політика ФРС, інфляція, сила долара, геополітика.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть стиль торгівлі',
          text: 'Позиційна, свінг або внутрішньоденна. Адаптуйте під волатильність золота.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Налаштуйте ризики',
          text: 'Менші позиції, ширші стопи, максимум 1% ризику на угоду.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Визначте рівні',
          text: 'Історичні підтримки/опори та психологічні рівні ($1800, $1900, $2000).',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Відстежуйте кореляції',
          text: 'DXY, доходність облігацій, срібло для підтвердження сигналів.',
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
      name: 'Термінологія торгівлі золотом',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'XAUUSD',
          description: 'Торговий символ золота в доларах США.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тройська унція',
          description: 'Стандартна одиниця вимірювання золота — 31.1035 грама.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Захисний актив',
          description:
            'Актив, що зберігає або збільшує вартість під час турбулентності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Реальні ставки',
          description: 'Номінальні процентні ставки мінус інфляція.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лондонський фіксинг',
          description: 'Еталонна ціна золота, що встановлюється двічі на день.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'COMEX',
          description: "Основна біржа ф'ючерсів на золото.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спот-золото',
          description: 'Поточна ринкова ціна для негайної поставки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Співвідношення золото/срібло',
          description: 'Кількість унцій срібла для купівлі унції золота.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DXY',
          description: 'Індекс долара США відносно основних валют.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Втеча в якість',
          description:
            'Переміщення капіталу в безпечні активи під час невизначеності.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
