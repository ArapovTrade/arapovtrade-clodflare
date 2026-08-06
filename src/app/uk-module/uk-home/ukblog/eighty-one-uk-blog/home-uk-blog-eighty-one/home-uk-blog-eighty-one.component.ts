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
  selector: 'app-home-uk-blog-eighty-one',
  templateUrl: './home-uk-blog-eighty-one.component.html',
  styleUrl: './home-uk-blog-eighty-one.component.scss',
})
export class HomeUkBlogEightyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
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
    this.titleService.setTitle(
      'Патерн Трикутник у трейдингу: повний посібник | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Патерн трикутник у трейдингу: повний посібник з торгівлі. Дізнайтеся, як розпізнавати висхідний, низхідний та симетричний трикутники для успішної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
    });

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
          '@id': 'https://arapov.trade/uk/freestudying/trianglefigure#article',
          headline: 'Патерн Трикутник у трейдингу: повний посібник з торгівлі',
          description:
            'Детальний посібник з патерну трикутник у технічному аналізі. Висхідний, низхідний та симетричний трикутники: ідентифікація, торгові стратегії та управління ризиками.',
          image: 'https://arapov.trade/assets/img/content/triangle1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@id': 'https://arapov.trade/#organization',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/trianglefigure',
          },
          articleSection: 'Технічний аналіз',
          keywords: [
            'патерн трикутник',
            'технічний аналіз',
            'висхідний трикутник',
            'низхідний трикутник',
            'симетричний трикутник',
            'торгові стратегії',
          ],
          wordCount: 1364,
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
      '@id': 'https://arapov.trade/uk/freestudying/trianglefigure#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке патерн трикутник у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Патерн трикутник — це графічна формація технічного аналізу, яка утворюється при звуженні цінового діапазону між лініями підтримки та опору. Даний патерн сигналізує про консолідацію ринку перед потенційним пробоєм в одному з напрямків.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які види трикутників існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У технічному аналізі виділяють три основних типи трикутників: висхідний трикутник (бичачий сигнал з горизонтальним опором), низхідний трикутник (ведмежий сигнал з горизонтальною підтримкою) та симетричний трикутник (нейтральний патерн з рівновагою сил).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати патерн трикутник?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгівля трикутником передбачає вхід у позицію після підтвердженого пробою однієї з меж формації. Стоп-лос розміщується за протилежною межею, а ціль по прибутку розраховується за висотою трикутника, відкладеною від точки пробою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як уникнути хибних пробоїв трикутника?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для фільтрації хибних пробоїв необхідно: дочекатися закриття свічки за межею патерну, підтвердити пробій зростанням обсягів торгів, використовувати додаткові індикатори (RSI, MACD) та застосовувати процентні фільтри для виключення незначних виходів за межі.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах краще торгувати трикутники?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найбільш надійні сигнали трикутник дає на середніх та старших таймфреймах — від годинного до денного графіка. Формації на тижневих графіках призводять до найзначніших рухів, але вимагають терпіння. Молодші таймфрейми дають більше хибних сигналів.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trianglefigure#howto',
      name: 'Як торгувати патерн трикутник',
      description:
        'Покроковий посібник з торгівлі патерном трикутник у технічному аналізі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікація патерну',
          text: 'Знайдіть на графіку звужуваний ціновий діапазон з мінімум чотирма точками дотику меж. Визначте тип трикутника: висхідний, низхідний або симетричний.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Аналіз обсягів',
          text: 'Переконайтеся, що обсяги торгів знижуються по мірі формування трикутника. Це підтверджує достовірність патерну та акумуляцію енергії для пробою.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Очікування пробою',
          text: 'Дочекайтеся пробою однієї з меж трикутника із закриттям свічки за межами формації. Підтвердьте пробій збільшенням обсягів торгів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Відкриття позиції',
          text: 'Увійдіть у позицію в напрямку пробою. Встановіть стоп-лос за протилежною межею трикутника або останнім локальним екстремумом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Фіксація прибутку',
          text: 'Розрахуйте цільовий рівень за висотою трикутника. Розгляньте часткову фіксацію прибутку на проміжних рівнях для зниження ризиків.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trianglefigure#terms',
      name: 'Глосарій термінів патерну трикутник',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Висхідний трикутник',
          description:
            'Бичачий патерн технічного аналізу з горизонтальним рівнем опору та висхідною лінією підтримки, що вказує на ймовірний пробій вгору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Низхідний трикутник',
          description:
            'Ведмежий патерн з горизонтальною лінією підтримки та низхідною лінією опору, що сигналізує про можливий пробій вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Симетричний трикутник',
          description:
            'Нейтральний патерн з одночасним зближенням обох трендових ліній, що відображає рівновагу ринкових сил з непередбачуваним напрямком пробою.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій',
          description:
            'Вихід ціни за межі трикутника із закріпленням за його межами, що сигналізує про початок нового спрямованого руху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Тимчасовий вихід ціни за межу трикутника з подальшим поверненням всередину формації, що не призводить до розвитку спрямованого руху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консолідація',
          description:
            'Період бічного руху ціни у звужуваному діапазоні, що характеризується зниженням волатильності та обсягів торгів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до пробитого рівня для його тестування як нової підтримки або опору після пробою.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Висота трикутника',
          description:
            'Відстань між верхньою та нижньою межами формації в її основі, що використовується для розрахунку цільового рівня руху після пробою.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
