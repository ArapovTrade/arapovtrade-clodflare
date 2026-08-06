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
  selector: 'app-home-uk-fourty-three',
  templateUrl: './home-uk-fourty-three.component.html',
  styleUrl: './home-uk-fourty-three.component.scss',
})
export class HomeUkFourtyThreeComponent implements OnInit {
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
      'Пули ліквідності в трейдингу: як їх використовувати для прибуткової торгівлі | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке пули ліквідності в трейдингу, як великі гравці маніпулюють ринком та як захистити свій депозит від полювання за стопами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/liquiditypools.png',
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
          '@id': 'https://arapov.trade/uk/freestudying/liquiditypools#article',
          headline:
            'Пули ліквідності в трейдингу: як їх використовувати для прибуткової торгівлі',
          description:
            'Дізнайтеся, що таке пули ліквідності в трейдингу, як великі гравці маніпулюють ринком та як захистити свій депозит від полювання за стопами.',
          image: 'https://arapov.trade/assets/img/content/liquiditypools1.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/liquiditypools',
          },
          articleSection: 'Навчання трейдингу',
          keywords:
            "пули ліквідності, Smart Money, стоп хантинг, маніпуляції ринком, об'ємний аналіз",
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
      '@id': 'https://arapov.trade/uk/freestudying/liquiditypools#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке пули ліквідності у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пули ліквідності — це зони на ціновому графіку, де зосереджена велика кількість торгових ордерів. Ці області формуються навколо ключових рівнів підтримки та опору, психологічних позначок та локальних екстремумів. Інституційні гравці використовують пули ліквідності для накопичення та розподілу позицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як Smart Money використовують ліквідність?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money використовують ліквідність для виконання масштабних ордерів. Вони навмисно рухають ціну до зон скупчення стоп-лоссів роздрібних трейдерів, активують ці ордери та використовують отриману ліквідність для входу у власні позиції за вигідними цінами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке стоп хантинг і як від нього захиститися?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Стоп хантинг — це цілеспрямований рух ціни до зон скупчення стоп-ордерів для їх активації. Для захисту рекомендується розміщувати стоп-лосси за справжніми рівнями ліквідності, аналізувати об'єми перед пробоєм та очікувати підтвердження руху.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які інструменти допомагають знаходити пули ліквідності?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Для пошуку пулів ліквідності трейдери використовують кластерний аналіз об'ємів, склянку ордерів, Footprint Charts та аналіз ордер-флоу. Ці інструменти дозволяють бачити приховані великі заявки та відстежувати дії інституційних гравців.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому ціна часто розвертається після збору ліквідності?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Після збору ліквідності великі гравці отримують необхідний об'єм для відкриття або закриття позицій. Коли мету досягнуто, тиск на ціну припиняється, і ринок повертається до справедливої вартості.",
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
      '@id': 'https://arapov.trade/uk/freestudying/liquiditypools#howto',
      name: 'Як знаходити та використовувати пули ліквідності в торгівлі',
      description:
        'Покрокове керівництво з ідентифікації зон ліквідності та їх застосування в торгових стратегіях',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте ключові рівні',
          text: 'Знайдіть на графіку значущі рівні підтримки та опору, локальні максимуми та мінімуми, а також психологічні цінові позначки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Проаналізуйте об'єми",
          text: "Використовуйте індикатори об'єму та кластерний аналіз для визначення зон з високою концентрацією ордерів.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відстежуйте поведінку ціни',
          text: 'Спостерігайте за реакцією ціни при підході до зон ліквідності. Різкі рухи з подальшим розворотом вказують на збір ліквідності.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Дочекайтеся підтвердження',
          text: 'Не входьте в угоду одразу після пробою рівня. Дочекайтеся ретесту зони ліквідності та підтверджуючих сигналів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте ризиками',
          text: 'Розміщуйте стоп-лосси за справжніми рівнями ліквідності, враховуючи можливі маніпуляції.',
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
      '@id': 'https://arapov.trade/uk/freestudying/liquiditypools#glossary',
      name: 'Глосарій термінів з ліквідності в трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пул ліквідності',
          description:
            'Область на графіку з високою концентрацією торгових ордерів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Інституційні учасники ринку — банки, хедж-фонди та маркет-мейкери.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп хантинг',
          description:
            'Цілеспрямований рух ціни до зон скупчення стоп-ордерів для їх активації.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордер-флоу',
          description: 'Аналіз потоку торгових заявок у реальному часі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Ціновий розрив, утворений імпульсним рухом, де відсутній баланс між попитом та пропозицією.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імбаланс',
          description:
            'Дисбаланс між покупцями та продавцями, що призводить до спрямованого руху ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом постійного виставлення заявок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Chart',
          description:
            "Графік, що відображає об'єм торгів всередині кожної свічки.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за ключовий рівень з подальшим поверненням.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
