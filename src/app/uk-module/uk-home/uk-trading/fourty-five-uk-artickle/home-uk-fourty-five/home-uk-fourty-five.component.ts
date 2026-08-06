import {
  Component,
  OnInit,
  Inject,
  signal,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home-uk-fourty-five',
  templateUrl: './home-uk-fourty-five.component.html',
  styleUrl: './home-uk-fourty-five.component.scss',
})
export class HomeUkFourtyFiveComponent implements OnInit {
  readonly panelOpenState = signal(false);
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private renderer: Renderer2,
    private artickleServ: ArticlesService,
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setBreadcrumbSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setVideoObjectSchema();
    this.setGlossarySchema();
    this.setEducationalOccupationalProgramSchema();
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Безкоштовний курс з трейдингу для початківців — Ігор Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Безкоштовний курс з трейдингу з нуля: технічний аналіз, метод Вайкоффа, об`ємний аналіз, торгова система з позитивним математичним очікуванням. 32 розділів, живі розбори угод.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'dateModified',
      content: '2026-06-25T00:00:00Z',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/content/freeeducationnew.webp',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `https://arapov.trade/assets/img/content/freeeducationnew.webp`,
    });

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
  }

  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  scrollToFragment(fragment: string) {
    // requestAnimationFrame надёжнее чем setTimeout
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = this.document.getElementById(fragment);
        if (element) {
          const offset = 80;
          const top =
            element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 400);
    });
  }

  // Вызывай этот метод при клике на ссылку
  navigateTo(fragment: string) {
    this.router
      .navigate([], {
        fragment,
        // Это заставляет Angular эмитить событие даже если fragment тот же
        onSameUrlNavigation: 'reload',
      })
      .then(() => {
        this.scrollToFragment(fragment);
      });
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

  // navigateTo(path: string) {
  //   this.router.navigate([path]);
  // }

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
    let index = 1;

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
      'VideoObject',
      'EducationalOccupationalProgram',
      'BreadcrumbList',
      'Course', // NEW (Organization сюда НЕ добавлять)
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);
        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
        );
        if (shouldRemove) script.remove();
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
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://arapov.trade/uk/freestudying/freeeducation#article',
          headline:
            'Безкоштовний курс з трейдингу для початківців — Ігор Арапов',
          description:
            'Безкоштовний курс з трейдингу з нуля: технічний аналіз, метод Вайкоффа, об`ємний аналіз, торгова система з позитивним математичним очікуванням. 32 розділів, живі розбори угод.',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2026-06-25T00:00:00+02:00', // ← сведено к meta (было 2026-05-29)
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/freeeducation',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/freeeducationnew.webp',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'безкоштовний курс трейдингу',
            'навчання трейдингу з нуля',
            'трейдинг для початківців',
            'технічний аналіз',
            'Smart Money',
            'об`ємний аналіз',
          ],
          video: [
            {
              '@id':
                'https://arapov.trade/uk/freestudying/freeeducation#video2',
            },
          ],
        },
      ],
    });
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
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
    });
  }
  // ============================================================
  //  BREADCRUMB — живой rich result (NEW, UK)
  // ============================================================
  private setBreadcrumbSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Головна',
          item: 'https://arapov.trade/uk',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Безкоштовне навчання',
          item: 'https://arapov.trade/uk/freestudying',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Безкоштовний курс з трейдингу для початківців',
          item: 'https://arapov.trade/uk/freestudying/freeeducation',
        },
      ],
    });
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чи реально опанувати трейдинг самостійно без платних курсів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Абсолютно реально. Цей курс створювався саме з такою метою — дати повну базу знань безкоштовно. Понад 51+ статей та 78+ відеоуроків покривають все необхідне: від базових понять до професійних стратегій Smart Money.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який термін потрібен для освоєння трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Теоретичну частину можна опанувати за 3-4 тижні інтенсивного навчання. Практичне відпрацювання на демо-рахунку займе ще 1-2 місяці. Загалом, щоб вийти на стабільну торгівлю, знадобиться близько 3 місяців систематичної роботи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає співвідношення ризику до прибутку 1:3?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це фундаментальний принцип прибуткової торгівлі. Якщо ви ризикуєте 10 пунктами (стоп-лос), то ціль має бути мінімум 30 пунктів. За такого підходу навіть 40% виграшних угод забезпечують прибуток на дистанції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Хто такі Smart Money і навіщо їх вивчати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — це великі гравці ринку: інвестиційні банки, хедж-фонди, маркет-мейкери. Вони мають достатній капітал, щоб рухати ціну. Розуміючи їхню логіку, ви перестаєте бути жертвою маніпуляцій і починаєте торгувати разом з ними.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка головна причина збитків у новачків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгівля без чіткої системи та ігнорування ризик-менеджменту. Коли немає правил входу, виходу та контролю збитків — ви граєте в казино, де математика проти вас. Система з позитивним очікуванням змінює все.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки грошей потрібно для старту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для навчання — нуль, торгуйте на демо. Для реальної торгівлі мінімум залежить від брокера та інструменту. Головне правило: ризикуйте не більше 1-2% депозиту на угоду. Краще менший депозит з правильним ризик-менеджментом, ніж великий без нього.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке рівень зміни пріоритету?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це цінова зона, з якої почався імпульсний рух, що оновив екстремуми. Простіше кажучи — місце, де одна сторона (покупці чи продавці) перехопила контроль над ринком. Ці рівні часто стають точками входу після відкату.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розпізнати хибний пробій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ознаки хибного пробою: ціна виходить за рівень на підвищеному обсязі, але не закріплюється там. Формується свічка відторгнення (пін-бар) або поглинання. Потім ціна повертається в діапазон і рухається у протилежному напрямку.',
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
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#howto',
      name: 'Покроковий план опанування трейдингу',
      description:
        'Від повного нуля до першої прибуткової угоди на реальному рахунку.',
      totalTime: 'P3M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зруйнуйте ілюзії про легкі гроші',
          text: 'Почніть з розділу для початківців. Зрозумійте, що трейдинг — це бізнес з ризиками, а не спосіб швидко розбагатіти.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Навчіться читати графіки',
          text: 'Опануйте технічний аналіз: фази ринку, рівні підтримки та опору, трендові та откатні хвилі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Додайте обсяги до аналізу',
          text: 'Вивчіть обсяговий аналіз за Вайкоффом. Зрозумійте принцип зусилля-результат для визначення справжніх намірів ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розкрийте логіку великих гравців',
          text: 'Опануйте концепцію Smart Money: хибні пробої, захоплення ліквідності, маніпуляції з ордерами.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оволодійте ризик-менеджментом',
          text: 'Навчіться розраховувати обсяг позиції, виставляти стоп-лос та дотримуватися правила 1:3.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Відпрацюйте 100+ угод на демо',
          text: 'Тільки практика закріплює теорію. Ведіть журнал угод, аналізуйте помилки, рахуйте статистику.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Перейдіть на реальний рахунок',
          text: 'Коли демо показує стабільний плюс — починайте торгувати реальними грошима з мінімальним обсягом.',
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
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#terms',
      name: 'Словник трейдера',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Біржова торгівля з метою заробітку на коливаннях цін фінансових активів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Прогнозування руху цін через вивчення графіків та цінових патернів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description:
            'Цінова зона, де попит зупиняє падіння і штовхає ціну вгору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень опору',
          description:
            'Цінова зона, де пропозиція зупиняє зростання і штовхає ціну вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі учасники ринку, здатні впливати на рух ціни своїми обсягами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Вихід ціни за рівень без закріплення з наступним розворотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного обмеження збитку в угоді.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер для автоматичної фіксації прибутку при досягненні цілі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система правил контролю ризиків для збереження торгового капіталу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математичне очікування',
          description:
            'Середній результат угоди, що визначає прибутковість системи на дистанції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WinRate',
          description:
            'Відсоток виграшних угод від загальної кількості угод у системі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description: 'Торгівля на основі чистого руху ціни без індикаторів.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  EducationalOccupationalProgram — provider/hasCourse по @id (FIX)
  // ============================================================
  private setEducationalOccupationalProgramSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#program',
      name: 'Безкоштовне навчання трейдингу з нуля',
      description:
        'Безкоштовний курс трейдингу для початківців від практикуючого трейдера з 2013 року. Понад 151+ статей, 78+ відео: від основ до Smart Money та Вайкоффа.',
      provider: { '@id': 'https://arapov.trade/#person' },
      timeToComplete: 'P3M',
      occupationalCategory: 'Трейдер',
      programType: 'Онлайн-курс',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      hasCourse: {
        '@type': 'Course',
        name: 'Безкоштовне навчання трейдингу з нуля',
        description: 'Понад 51+ статей та 78+ відеоуроків з трейдингу',
        provider: { '@id': 'https://arapov.trade/#person' }, // ← вместо инлайн-Person
      },
    });
  }

  // ============================================================
  //  VIDEOOBJECT — author/publisher по @id (FIX)
  // ============================================================
  private setVideoObjectSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'VideoObject',
          '@id': 'https://arapov.trade/uk/freestudying/freeeducation#video2',
          name: 'Курс з трейдингу для початківців | Від теорії до першої угоди',
          description:
            'Безкоштовний курс з трейдингу для тих, хто тільки знайомиться з ринком. Жодної зайвої теорії — лише база, торгова система та практика на демосчунку. Розбираємо все з нуля: від торгового термінала до точки входу в угоду за методом Вайкоффа.',
          thumbnailUrl: 'https://i.ytimg.com/vi/tmiHem6NOZs/maxresdefault.jpg',
          uploadDate: '2026-05-29T00:00:00+02:00',
          duration: 'PT45M2S',
          contentUrl: 'https://www.youtube.com/watch?v=tmiHem6NOZs',
          embedUrl:
            'https://www.youtube.com/embed/tmiHem6NOZs?si=lMeQKyeWBPviIQPq',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
        },
      ],
    });
  }
}
