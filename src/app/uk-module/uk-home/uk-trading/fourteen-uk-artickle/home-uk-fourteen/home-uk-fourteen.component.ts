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
  selector: 'app-home-uk-fourteen',
  templateUrl: './home-uk-fourteen.component.html',
  styleUrl: './home-uk-fourteen.component.scss',
})
export class HomeUkFourteenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Ризик кредитного плеча на Форекс: чому трейдери втрачають гроші | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Ризики кредитного плеча на Форекс: чому 70% трейдерів втрачають гроші. Математика збитків, психологія торгівлі, стратегії зниження ризиків при використанні leverage.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/forexLeverageRisk.webp',
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
          headline:
            'Ризик кредитного плеча на Форекс: чому трейдери втрачають гроші',
          description:
            'Ризики кредитного плеча на Форекс: чому 70% трейдерів втрачають гроші. Математика збитків, психологія торгівлі, стратегії зниження ризиків при використанні leverage.',
          image:
            'https://arapov.trade/assets/img/content/forexLeverageRisk1.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/forexleveragerisk',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1367,
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
          name: 'Яке кредитне плече безпечне для початківців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендується використовувати плече не вище 1:10. Це дозволяє робити помилки навчання без катастрофічних наслідків для депозиту. Збільшення плеча виправдане лише після демонстрації стабільної прибутковості протягом кількох місяців торгівлі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому більшість трейдерів втрачають гроші при використанні високого плеча?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Головна причина — асиметрія сприйняття ризику. Трейдери фокусуються на потенційному прибутку та ігнорують рівноймовірний збиток. При плечі 1:100 рух ціни на 1% проти позиції обнуляє депозит, а такі коливання трапляються на ринку щодня.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке маржин-кол і як його уникнути?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржин-кол — примусове закриття позицій брокером при падінні вільних коштів нижче встановленого рівня. Щоб його уникнути, використовуйте не більше 20-30% доступної маржі, встановлюйте стоп-лоси та обирайте помірне кредитне плече.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як правильно розрахувати розмір позиції при торгівлі з плечем?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Застосовуйте правило одного відсотка: збиток по будь-якій позиції не повинен перевищувати 1% від депозиту. Розрахуйте відстань до стоп-лоса в пунктах, потім визначте обсяг позиції так, щоб при спрацюванні стопа втрата склала не більше 1% капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: "Які приховані витрати пов'язані з високим кредитним плечем?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Високе плече збільшує спреди та свопи пропорційно обсягу позиції. При плечі 1:100 спред у 2 пункти на позиції 100 000 доларів становить 20 доларів. Також зростає ризик прослизання під час високої волатильності ринку.',
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
      name: 'Як безпечно використовувати кредитне плече на Форекс',
      description:
        'Покрокове керівництво з управління ризиками при торгівлі з кредитним плечем',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Почніть з демо-рахунку',
          text: 'Відкрийте демо-рахунок з плечем 1:10 та торгуйте мінімум три місяці, ведучи детальний журнал угод. Аналізуйте результати щотижня.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Обмежте ризик на угоду',
          text: 'Застосовуйте правило одного відсотка: збиток по будь-якій позиції не повинен перевищувати 1% від депозиту. Встановлюйте стоп-лос на кожній угоді.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Диверсифікуйте позиції',
          text: "Розподіляйте капітал між кількома інструментами, враховуючи кореляцію валютних пар. Уникайте концентрації у пов'язаних активах.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Контролюйте маржу',
          text: 'Використовуйте не більше 20-30% доступної маржі. Слідкуйте за рівнем вільних коштів у терміналі та скорочуйте позиції при наближенні до критичних значень.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Збільшуйте плече поступово',
          text: 'Підвищуйте рівень плеча не більше ніж на 10 пунктів за квартал за умови стабільної прибутковості. Повертайтеся до менших значень при серії збитків.',
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
      name: 'Терміни трейдингу: кредитне плече та ризики',
      description:
        "Глосарій термінів, пов'язаних з кредитним плечем та управлінням ризиками на Форекс",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Інструмент, що дозволяє трейдеру оперувати сумою, яка в рази перевищує депозит, за рахунок позикових коштів брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description:
            'Примусове закриття позицій брокером при падінні вільних коштів на рахунку нижче мінімально допустимого рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Заставна сума, що блокується брокером при відкритті позиції з використанням кредитного плеча',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description:
            'Комісія за перенесення відкритої позиції через ніч, що залежить від різниці процентних ставок валютних пар',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі та продажу активу, що становить дохід брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Виконання ордера за ціною, відмінною від запланованої, через високу волатильність або недостатню ліквідність',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тілт',
          description:
            'Стан емоційного зриву трейдера після серії невдач, що призводить до імпульсивних рішень та порушення торгової стратегії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — індикатор, що показує середній діапазон руху ціни за визначений період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу за визначений період часу, що вимірюється у відсотках або пунктах',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
