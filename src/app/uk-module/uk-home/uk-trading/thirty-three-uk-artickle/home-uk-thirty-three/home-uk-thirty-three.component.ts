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
  selector: 'app-home-uk-thirty-three',
  templateUrl: './home-uk-thirty-three.component.html',
  styleUrl: './home-uk-thirty-three.component.scss',
})
export class HomeUkThirtyThreeComponent implements OnInit {
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
      'Реквоти у трейдингу: причини та методи уникнення | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Реквоти у трейдингу — детальний посібник для трейдерів-початківців. Дізнайтеся, чому брокер змінює ціну ордера та як мінімізувати втрати від реквотів.',
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
          headline: 'Реквоти у трейдингу: причини та методи уникнення',
          description:
            'Детальний посібник по реквотах для трейдерів-початківців. Причини виникнення, вплив на торгівлю та практичні методи мінімізації.',
          image: 'https://arapov.trade/assets/img/content/requotes.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
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
            '@id': 'https://arapov.trade/uk/freestudying/requotes',
          },
          articleSection: 'Трейдинг для початківців',
          keywords: [
            'реквоти',
            'requote',
            'виконання ордерів',
            'брокер',
            'волатильність',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке реквот у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Реквот (requote) — це повідомлення від брокера про неможливість виконати ордер за запитаною ціною. Брокер пропонує нову ціну, яку трейдер може прийняти або відхилити. Реквоти виникають через швидку зміну ринкових котирувань між моментом відправлення ордера та його обробкою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому брокер видає реквоти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Головні причини реквотів: висока волатильність під час виходу економічних новин, затримки інтернет-з'єднання, повільна обробка ордерів на сервері брокера, низька ліквідність торгового інструменту та модель роботи брокера (Dealing Desk брокери частіше видають реквоти).",
          },
        },
        {
          '@type': 'Question',
          name: 'Як зменшити кількість реквотів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Для мінімізації реквотів рекомендується: обирати ECN/STP брокерів зі швидким виконанням, використовувати відкладені ордери замість ринкових, уникати торгівлі під час виходу важливих новин, покращити інтернет-з'єднання або орендувати VPS-сервер поблизу серверів брокера.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим реквот відрізняється від прослизання?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Реквот — це запит на підтвердження нової ціни до виконання ордера, трейдер може відмовитися від угоди. Прослизання (slippage) — це автоматичне виконання ордера за іншою ціною без запиту підтвердження. При реквоті трейдер має вибір, при прослизанні угода вже виконана.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який брокер краще для уникнення реквотів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для мінімізації реквотів обирайте ECN або STP брокерів з прямим доступом до міжбанківського ринку. Перевіряйте наявність ліцензії регулятора (FCA, ASIC, CySEC), вивчайте відгуки про швидкість виконання та тестуйте платформу на демо-рахунку перед реальною торгівлею.',
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
      name: 'Як мінімізувати реквоти у трейдингу',
      description:
        'Покрокова інструкція зі зниження частоти реквотів при торгівлі на фінансових ринках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть надійного брокера',
          text: 'Вивчіть репутацію брокера, перевірте наявність ліцензії регулятора та оберіть ECN або STP рахунок з прямим доступом до ринку для швидкого виконання ордерів.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Застосовуйте відкладені ордери',
          text: 'Замість ринкових ордерів використовуйте лімітні та стоп-ордери, які виконуються автоматично при досягненні заданої ціни без запиту підтвердження.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: "Оптимізуйте інтернет-з'єднання",
          text: 'Використовуйте дротове підключення замість Wi-Fi, розгляньте оренду VPS-сервера поблизу дата-центру брокера для мінімізації затримок передачі даних.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Уникайте торгівлі під час новин',
          text: 'Відстежуйте економічний календар та утримуйтесь від відкриття позицій за 5-10 хвилин до і після виходу важливих економічних даних з високою волатильністю.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Обирайте оптимальний час для торгівлі',
          text: 'Торгуйте в періоди високої ліквідності — під час перетину європейської та американської сесій, уникаючи нічних годин та святкових днів з низькою активністю.',
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
      name: 'Глосарій термінів трейдингу: реквоти',
      description:
        "Основні терміни, пов'язані з реквотами та виконанням ордерів у трейдингу",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Реквот',
          description:
            'Повторний запит ціни від брокера, коли початкова ціна ордера вже недоступна через зміну ринкових котирувань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Статистичний показник інтенсивності коливань ціни активу за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність ринку швидко виконувати великі ордери без суттєвого впливу на поточну ціну активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN-брокер',
          description:
            'Брокер з електронною комунікаційною мережею, що забезпечує прямий доступ до міжбанківського ринку без посередників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dealing Desk',
          description:
            'Модель роботи брокера, при якій компанія сама виступає контрагентом в угодах клієнтів та обробляє ордери всередині',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Різниця між очікуваною ціною виконання ордера та фактичною ціною, за якою угоду було здійснено',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VPS-сервер',
          description:
            'Віртуальний виділений сервер, який трейдери використовують для розміщення торгових терміналів поблизу серверів брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Відкладений ордер',
          description:
            'Торговий наказ на купівлю або продаж активу за заздалегідь вказаною ціною, який активується автоматично при досягненні цієї ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) та ціною продажу (Bid) фінансового інструменту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом одночасного виставлення котирувань на купівлю та продаж активу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
