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
  selector: 'app-home-uk-twelve',
  templateUrl: './home-uk-twelve.component.html',
  styleUrl: './home-uk-twelve.component.scss',
})
export class HomeUkTwelveComponent implements OnInit {
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
      'Халвінг біткоїна — що це і як впливає на ціну BTC',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Халвінг біткоїна — що це таке, як працює та коли наступний. Повний розбір механізму скорочення емісії BTC, вплив на ціну та майнінг.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/halving.webp',
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
          '@id': 'https://arapov.trade/uk/freestudying/halving#article',
          headline:
            'Халвінг біткоїна — механізм скорочення емісії та вплив на ринок',
          description:
            'Халвінг біткоїна — що це таке, як працює та коли наступний. Повний розбір механізму скорочення емісії BTC, вплив на ціну та майнінг.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/halving',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/halving1.webp',
          },
          articleSection: 'Криптовалюти',
          keywords: [
            'халвінг',
            'біткоїн',
            'BTC',
            'майнінг',
            'криптовалюти',
            'емісія',
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
      '@id': 'https://arapov.trade/uk/freestudying/halving#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке халвінг біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвінг — це запрограмоване скорочення винагороди майнерам за видобуток нових блоків удвічі. Відбувається кожні 210 000 блоків, приблизно раз на чотири роки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли відбудеться наступний халвінг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвінг 2024 року вже відбувся у квітні, скоротивши винагороду до 3,125 BTC. Наступний очікується у 2028 році з винагородою 1,5625 BTC за блок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як халвінг впливає на ціну біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Історично халвінг супроводжувався зростанням ціни BTC через скорочення пропозиції при збереженні або зростанні попиту. Після халвінгу 2020 року біткоїн досяг $69 000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що буде після видобутку всіх біткоїнів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Після видобутку останнього з 21 мільйона біткоїнів (приблизно у 2140 році) майнери заробляти виключно на комісіях за транзакції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому халвінг важливий для інвесторів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвінг створює дефіцит біткоїнів, обмежуючи емісію. Це робить BTC аналогом цифрового золота з передбачуваною монетарною політикою.',
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
      '@id': 'https://arapov.trade/uk/freestudying/halving#howto',
      name: 'Як підготуватися до халвінгу біткоїна',
      description:
        'Покрокова інструкція щодо підготовки інвестиційної стратегії до події халвінгу.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть історію попередніх халвінгів',
          text: 'Проаналізуйте цінову динаміку після халвінгів 2012, 2016, 2020 та 2024 років, щоб зрозуміти типові ринкові патерни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте фазу ринкового циклу',
          text: 'Встановіть поточну позицію у чотирирічному циклі: накопичення, зростання, пік або корекція.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцініть макроекономічні фактори',
          text: 'Враховуйте процентні ставки, інфляцію та регуляторне середовище, що впливають на криптовалютний ринок.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розробіть стратегію управління ризиками',
          text: 'Визначте розмір позиції, рівні фіксації прибутку та стоп-лоси для захисту капіталу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Диверсифікуйте портфель',
          text: 'Розподіліть інвестиції між біткоїном, альткоїнами та традиційними активами для зниження ризику.',
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
      '@id': 'https://arapov.trade/uk/freestudying/halving#terms',
      name: 'Глосарій термінів халвінгу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Халвінг',
          description:
            'Запрограмоване скорочення винагороди за майнінг блоку удвічі, що відбувається кожні 210 000 блоків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнінг',
          description:
            'Процес підтвердження транзакцій та створення нових блоків у блокчейні з використанням обчислювальних потужностей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хешрейт',
          description:
            'Загальна обчислювальна потужність мережі біткоїн, що вимірюється у хешах на секунду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Work',
          description:
            'Консенсусний механізм, що вимагає вирішення криптографічних задач для підтвердження транзакцій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Блок',
          description:
            "Одиниця даних у блокчейні, що містить інформацію про транзакції та пов'язана з попередніми блоками.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Емісія',
          description:
            'Процес випуску нових біткоїнів через винагороди майнерам за видобуток блоків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Складність майнінгу',
          description:
            'Параметр, що визначає трудність знаходження нового блоку, коригований кожні 2016 блоків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнінг-пул',
          description:
            "Об'єднання майнерів для спільного видобутку блоків та розподілу винагороди.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бичачий ринок',
          description:
            'Період стійкого зростання цін на ринку, що характеризується оптимізмом інвесторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмежий ринок',
          description:
            'Період стійкого падіння цін на ринку, що супроводжується песимізмом учасників.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
