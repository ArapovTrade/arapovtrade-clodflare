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
  selector: 'app-home-uk-blog-ninty-six',
  templateUrl: './home-uk-blog-ninty-six.component.html',
  styleUrl: './home-uk-blog-ninty-six.component.scss',
})
export class HomeUkBlogNintySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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

    this.titleService.setTitle('Торгівля нафтою | Аналіз WTI та Brent');
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгівля нафтою: аналіз WTI та Brent, фундаментальні драйвери, технічні стратегії та управління ризиками для енергетичних трейдерів.',
    });
     this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Торгівля нафтою: Повний посібник з ринку',
          description:
            'Торгівля нафтою: аналіз WTI та Brent, фундаментальні драйвери, технічні стратегії та управління ризиками для енергетичних трейдерів.',
          image: 'https://arapov.trade/assets/img/content/oiltrading1.jpg',
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
          datePublished: '2025-06-07T00:00:00+02:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/oiltrading',
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
          name: 'Чим відрізняються WTI та Brent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WTI — американський бенчмарк на NYMEX. Brent — міжнародний бенчмарк Північного моря на ICE. Brent зазвичай торгується з премією через глобальне значення.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які фактори впливають на ціну нафти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові драйвери: рішення OPEC+, глобальний попит, запаси США, геополітика, курс долара, сезонність.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли виходять звіти про запаси нафти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EIA публікує тижневі дані в середу о 17:30 за Києвом. API — у вівторок ввечері. Обидва звіти суттєво рухають ринок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка волатильність торгівлі нафтою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нафта високоволатильна — денні діапазони 2-5% звичайні. Геополітичні події можуть спричинити рухи 10%+.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке плече рекомендується для нафти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Консервативне плече 3-5x максимум. Волатильність нафти швидко посилює збитки. Враховуйте потенційні гепи.',
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
      name: 'Як торгувати нафтою',
      description: 'Кроки ефективної торгівлі нафтою',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Моніторте пропозицію',
          text: 'Відстежуйте рішення OPEC+, виробництво США, збої поставок.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Аналізуйте попит',
          text: 'Слідкуйте за економічними даними, активністю НПЗ, сезонністю.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Стежте за запасами',
          text: 'Торгуйте навколо звітів EIA та API з контролем ризиків.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Застосовуйте теханаліз',
          text: 'Рівні підтримки/опору, ковзні середні, індикатори імпульсу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте ризиками',
          text: 'Ширші стопи, менші позиції, повага до волатильності.',
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
      name: 'Термінологія торгівлі нафтою',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'WTI',
          description: 'West Texas Intermediate — американський бенчмарк.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Brent',
          description:
            'Бенчмарк Північного моря для міжнародного ціноутворення.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OPEC',
          description: 'Організація країн-експортерів нафти.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EIA',
          description: 'Управління енергетичної інформації США.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Контанго',
          description: "Ф'ючерси вище спотової ціни.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Беквордація',
          description: "Ф'ючерси нижче спотової ціни.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Крек-спред',
          description: 'Різниця між сирою нафтою та нафтопродуктами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Густота API',
          description: 'Показник щільності та якості нафти.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Барель',
          description: 'Стандартна одиниця — 42 галони США.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Rig Count',
          description: 'Кількість активних бурових установок.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
