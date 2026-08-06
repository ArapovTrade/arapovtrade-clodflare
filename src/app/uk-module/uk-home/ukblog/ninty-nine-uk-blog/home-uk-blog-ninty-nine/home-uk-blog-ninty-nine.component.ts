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
  selector: 'app-home-uk-blog-ninty-nine',
  templateUrl: './home-uk-blog-ninty-nine.component.html',
  styleUrl: './home-uk-blog-ninty-nine.component.scss',
})
export class HomeUkBlogNintyNineComponent implements OnInit {
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

    this.titleService.setTitle('Індикатор MACD Повний посібник з торгівлі');
    this.meta.updateTag({
      name: 'description',
      content:
        'Індикатор MACD: повний посібник з торгівлі. Налаштування, сигнали, дивергенції, стратегії використання гістограми та сигнальної лінії.',
    });
     this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

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
          headline:
            'Індикатор MACD: Повний посібник зі збіжності-розбіжності ковзних середніх',
          description:
            'Індикатор MACD: повний посібник з торгівлі. Налаштування, сигнали, дивергенції, стратегії використання гістограми та сигнальної лінії.',
          image: 'https://arapov.trade/assets/img/content/macdindicator.png',
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
          datePublished: '2025-06-16T00:00:00+02:00',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/macdindicator',
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
          name: 'Що таке індикатор MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD (Moving Average Convergence Divergence) — це трендовий індикатор-осцилятор, що показує співвідношення між двома експоненціальними ковзними середніми. Розроблений Джеральдом Аппелем у 1979 році для визначення сили та напрямку тренду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які стандартні налаштування MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Класичні налаштування MACD: швидка EMA — 12 періодів, повільна EMA — 26 періодів, сигнальна лінія — 9 періодів. Ці параметри підходять для більшості ринків та таймфреймів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати за сигналами MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні сигнали MACD: перетин лінії MACD та сигнальної лінії (купівля при перетині знизу вгору, продаж — згори вниз), перетин нульової лінії, дивергенції між ціною та індикатором.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що показує гістограма MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Гістограма MACD відображає різницю між лінією MACD та сигнальною лінією. Зростаюча гістограма вказує на посилення імпульсу, спадна — на його послаблення. Зміна кольору попереджає про можливий розворот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим MACD відрізняється від RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD — трендовий індикатор, що краще працює у спрямованих рухах. RSI — осцилятор, ефективний у бокових ринках. MACD показує напрямок і силу тренду, RSI — зони перекупленості та перепроданості.',
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
      name: 'Як використовувати індикатор MACD у торгівлі',
      description:
        'Покроковий посібник із застосування MACD для пошуку торгових сигналів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Додайте MACD на графік',
          text: 'Відкрийте торгову платформу, виберіть MACD зі списку індикаторів. Стандартні налаштування: 12, 26, 9. Індикатор відобразиться під графіком ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте поточний тренд',
          text: 'Подивіться на положення лінії MACD відносно нульової лінії. Вище нуля — бичачий тренд, нижче — ведмежий. Це визначає пріоритетний напрямок торгівлі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Шукайте перетини ліній',
          text: 'Слідкуйте за перетином лінії MACD та сигнальної лінії. Перетин знизу вгору — сигнал на купівлю, згори вниз — на продаж.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналізуйте гістограму',
          text: 'Спостерігайте за висотою стовпців гістограми. Зменшення стовпців попереджає про послаблення імпульсу та можливий розворот або корекцію.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Перевірте наявність дивергенцій',
          text: 'Порівняйте напрямок цінових екстремумів з екстремумами MACD. Розбіжність вказує на послаблення тренду. Дочекайтеся підтвердження перед входом у угоду.',
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
      name: 'Термінологія індикатора MACD',
      description:
        'Ключові поняття для розуміння індикатора збіжності-розбіжності ковзних середніх',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence — індикатор, що вимірює збіжність і розбіжність ковзних середніх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія MACD',
          description:
            'Різниця між швидкою (12) та повільною (26) експоненціальними ковзними середніми',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сигнальна лінія',
          description:
            '9-періодна EMA від лінії MACD, використовується для генерації торгових сигналів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гістограма MACD',
          description:
            'Візуальне відображення різниці між лінією MACD та сигнальною лінією',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нульова лінія',
          description:
            'Центральна лінія індикатора, що розділяє бичачу та ведмежу території',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Збіжність',
          description:
            'Зближення ковзних середніх, що вказує на уповільнення тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розбіжність',
          description:
            'Віддалення ковзних середніх одна від одної, що вказує на посилення тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція MACD',
          description:
            'Розбіжність між напрямком ціни та індикатора, що сигналізує про можливий розворот',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
