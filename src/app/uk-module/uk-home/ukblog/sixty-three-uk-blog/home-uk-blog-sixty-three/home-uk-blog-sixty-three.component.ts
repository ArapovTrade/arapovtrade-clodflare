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
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-sixty-three',
  templateUrl: './home-uk-blog-sixty-three.component.html',
  styleUrl: './home-uk-blog-sixty-three.component.scss',
})
export class HomeUkBlogSixtyThreeComponent {
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
      'Smart Money: маніпуляції ринком та контроль натовпу | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як Smart Money маніпулюють ринком та контролюють натовп. Методи інституціоналів: хибні пробої, вибивання стопів, новинні маніпуляції. Практичні поради для трейдерів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-08' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneycontrol.png',
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
          '@id':
            'https://arapov.trade/uk/freestudying/smartmoneycontrol#article',
          headline: 'Smart Money: як великі гравці маніпулюють ринком',
          description:
            'Повний посібник з методів маніпуляції ринком великими інституційними гравцями. Дізнайтеся механізми створення хибних пробоїв, вибивання стопів та формування трендів.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneycontrol1.webp',
            width: 1200,
            height: 630,
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/smartmoneycontrol',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'маніпуляції ринком',
            'інституційні трейдери',
            'хибні пробої',
            'вибивання стопів',
          ],
          wordCount: 1397,
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneycontrol#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Хто такі Smart Money у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — це великі інституційні учасники ринку: інвестиційні банки, хедж-фонди, маркет-мейкери та алгоритмічні торгові системи. Вони володіють значними фінансовими ресурсами, передовими технологіями та доступом до інформації, недоступної роздрібним трейдерам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як Smart Money маніпулюють ринком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Інституціонали використовують кілька методів: створення хибних пробоїв технічних рівнів, вибивання стоп-ордерів роздрібних трейдерів, маніпуляція через новини та формування штучного ринкового настрою через ЗМІ та соціальні мережі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке хибний пробій і як його розпізнати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Хибний пробій — це короткостроковий вихід ціни за ключовий технічний рівень з подальшим швидким поверненням. Розпізнати його можна за відсутністю підтверджуючого обсягу, швидким поверненням за рівень та невідповідністю руху загальному ринковому контексту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як захиститися від маніпуляцій Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для захисту слід аналізувати обсяги перед входом в угоду, уникати торгівлі під час виходу важливих новин, використовувати ретести рівнів замість входу на пробій та контролювати емоції, не піддаючись паніці або ейфорії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому роздрібні трейдери завжди запізнюються?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Роздрібні трейдери реагують на вже сформовані рухи, а не на їхні передумови. Вони входять в ринок після публікацій у ЗМІ, коли Smart Money вже готуються до виходу. Емоційні рішення призводять до покупок на максимумах та продажів на мінімумах.',
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneycontrol#howto',
      name: 'Як торгувати разом зі Smart Money',
      description:
        'Покрокове керівництво з визначення дій інституційних гравців та торгівлі на їхньому боці',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аналіз обсягів',
          text: 'Вивчіть співвідношення ціни та обсягу. Зростання обсягів підтверджує напрямок руху, падіння обсягів на фоні цінового руху сигналізує про можливий розворот.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначення зон ліквідності',
          text: 'Знайдіть рівні скупчення стоп-ордерів та зони підвищеного інтересу. Smart Money використовують ці зони для набору та розподілу позицій.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розпізнавання фаз ринку',
          text: 'Визначте поточну фазу ринку: накопичення, імпульс, розподіл або корекція. Входьте в угоди у фазі накопичення, а не на піку імпульсу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Очікування підтвердження',
          text: 'Не входьте одразу після пробою рівня. Дочекайтеся закріплення ціни, ретесту рівня та підтвердження від обсягу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Контроль емоцій',
          text: 'Дійте проти натовпу в моменти масової ейфорії або паніки. Зберігайте раціональний підхід та дотримуйтесь торгового плану.',
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneycontrol#glossary',
      name: 'Глосарій термінів Smart Money',
      description: 'Ключові терміни концепції Smart Money у трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі інституційні учасники ринку, включаючи банки, хедж-фонди та маркет-мейкерів, що володіють значними ресурсами та інформаційною перевагою.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткостроковий вихід ціни за ключовий технічний рівень з подальшим швидким поверненням, що використовується для збору ліквідності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вибивання стопів',
          description:
            'Цілеспрямований рух ціни в зони скупчення стоп-ордерів для їх активації та отримання ліквідності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Наявність достатньої кількості ордерів на купівлю та продаж, що дозволяють виконувати угоди без значного впливу на ціну.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопичення',
          description:
            'Період бокового руху ціни, коли великі гравці поступово набирають позиції перед початком трендового руху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза розподілу',
          description:
            'Період, коли інституціонали закривають позиції, передаючи їх роздрібним трейдерам перед розворотом тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом одночасного виставлення заявок на купівлю та продаж.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Зона на графіку, де великі гравці набирали або розподіляли позиції, що часто виступає рівнем підтримки або опору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Ціновий дисбаланс, що виникає при імпульсному русі, куди ціна часто повертається для заповнення.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Стратегія великих гравців з цілеспрямованого руху ціни в зони скупчення стоп-наказів для їх активації.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
