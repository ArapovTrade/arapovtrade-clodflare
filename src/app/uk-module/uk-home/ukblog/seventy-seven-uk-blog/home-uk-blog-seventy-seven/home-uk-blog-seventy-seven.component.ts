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
  selector: 'app-home-uk-blog-seventy-seven',
  templateUrl: './home-uk-blog-seventy-seven.component.html',
  styleUrl: './home-uk-blog-seventy-seven.component.scss',
})
export class HomeUkBlogSeventySevenComponent {
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
      'Психологія трейдингу: як контролювати емоції | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Психологія трейдингу: як контролювати емоції, подолати страх та жадібність. Практичні методи розвитку дисципліни та емоційної стійкості для стабільної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/emotionsaffect.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психологія трейдингу: Як емоції впливають на угоди?',
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
            'Психологія трейдингу: як контролювати емоції та не втратити депозит',
          description:
            'Повний посібник з контролю емоцій у трейдингу. Як подолати страх втрат, впоратися з жадібністю та розвинути психологічну стійкість для стабільної торгівлі.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          image: 'https://arapov.trade/assets/img/content/emotionsaffect1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/emotionsaffect',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1421,
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
          name: 'Чому емоції заважають заробляти на трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Емоції активують примітивні реакції мозку, які були корисні для виживання предків, але шкодять на фінансових ринках. Страх змушує передчасно закривати позиції, а жадібність призводить до завищених ризиків та утримання угод довше необхідного.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як подолати страх втрат у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для подолання страху втрат необхідно: встановити правила ризик-менеджменту з ризиком не більше 1-2% на угоду, вести торговий журнал для аналізу емоцій, прийняти що збитки — природна частина торгівлі, та оцінювати результати за тривалий період.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке торговий план і навіщо він потрібен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговий план — документ з правилами входу та виходу з угод, управління ризиками та обсягами позицій. Він знімає необхідність приймати рішення під тиском емоцій, дозволяючи трейдеру слідувати заздалегідь продуманим інструкціям.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розвинути дисципліну в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розвиток дисципліни потребує поступової роботи: почніть з простих правил (не торгувати в першу годину після пробудження, обмежити кількість угод на день), ведіть журнал угод, суворо дотримуйтесь стоп-лосів та поступово додавайте нові правила.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи допомагає медитація трейдерам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, медитація тренує здатність спостерігати за думками та емоціями без негайної реакції. Ця навичка допомагає трейдерам зберігати спокій у критичних ситуаціях та не піддаватися імпульсивним рішенням при волатильності ринку.',
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
      name: 'Як контролювати емоції в трейдингу',
      description:
        'Покрокова інструкція з розвитку емоційного контролю для стабільної торгівлі на фінансових ринках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Створіть торговий план',
          text: 'Розробіть документ з чіткими правилами входу та виходу з угод, розміром позицій та лімітами збитків. План знімає необхідність приймати рішення під тиском емоцій.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Встановіть правила ризик-менеджменту',
          text: 'Обмежте ризик на одну угоду в межах 1-2% від депозиту. Коли потенційний збиток невеликий, емоційний тиск значно знижується.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведіть торговий журнал',
          text: "Записуйте кожну угоду, свої емоції під час торгівлі та результати. Аналіз журналу допомагає виявити зв'язок між почуттями та збитками.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйте техніки розслаблення',
          text: 'Використовуйте дихальні вправи, медитацію та фізичну активність для зниження стресу та збереження ясності мислення.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Прийміть невизначеність результатів',
          text: 'Зрозумійте, що результат кожної окремої угоди непередбачуваний. Оцінюйте свою торгівлю за дотриманням системи на великій вибірці угод, а не за окремими результатами.',
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
      name: 'Терміни психології трейдингу',
      description:
        "Глосарій ключових термінів, пов'язаних з психологією торгівлі на фінансових ринках",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Страх втрат',
          description:
            'Психологічний феномен, при якому біль від втрати грошей відчувається приблизно вдвічі сильніше за задоволення від отримання тієї ж суми',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear of Missing Out — синдром втраченої вигоди, страх пропустити вигідну угоду, що змушує трейдера входити в ринок без аналізу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Документ з правилами входу та виходу з угод, управління ризиками та обсягами позицій, що допомагає уникнути емоційних рішень',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система правил управління капіталом, що обмежує потенційні збитки та захищає депозит від критичних втрат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий журнал',
          description:
            'Записи всіх угод із зазначенням причин входу, емоційного стану та результатів для подальшого аналізу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ейфорія трейдера',
          description:
            'Небезпечний емоційний стан після серії прибуткових угод, що знижує пильність та призводить до завищених ризиків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тільт',
          description:
            'Стан емоційного зриву після збитків, при якому трейдер втрачає контроль та здійснює хаотичні угоди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Самодисципліна',
          description:
            'Здатність дотримуватися правил торгової системи незалежно від емоцій та бажань у конкретний момент',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні певного рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Надмірно часта торгівля, часто викликана емоціями, що призводить до виснаження та збільшення комісій',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
