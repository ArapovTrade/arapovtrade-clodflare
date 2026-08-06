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
  selector: 'app-home-uk-blog-sixty-five',
  templateUrl: './home-uk-blog-sixty-five.component.html',
  styleUrl: './home-uk-blog-sixty-five.component.scss',
})
export class HomeUkBlogSixtyFiveComponent {
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
      'Біржовий Стакан та Стрічка Принтів: Як Читати Order Book | Ігор Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Біржовий стакан та стрічка принтів: повний посібник з аналізу Order Book і Time & Sales. Як читати глибину ринку, знаходити великих гравців та уникати маніпуляцій.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stockorderbook.png',
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
          '@id': 'https://arapov.trade/uk/freestudying/stockorderbook#article',
          headline:
            'Біржовий Стакан та Стрічка Принтів: Як Читати Order Book і Time & Sales',
          description:
            'Повний посібник з аналізу біржового стакана та стрічки принтів для визначення намірів великих гравців.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stockorderbook1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/stockorderbook',
          },
          articleSection: 'Навчання трейдингу',
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
      '@id': 'https://arapov.trade/uk/freestudying/stockorderbook#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке біржовий стакан простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Біржовий стакан (Order Book) — це таблиця всіх активних лімітних заявок на купівлю та продаж активу. Заявки на купівлю (Bid) розташовані нижче поточної ціни, заявки на продаж (Ask) — вище. Стакан показує, скільки контрактів готові купити або продати на кожному ціновому рівні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим стрічка принтів відрізняється від стакана?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стакан показує заявки, що очікують виконання — наміри учасників. Стрічка принтів (Time & Sales) показує вже здійснені угоди — реальні дії. Стакан відповідає на питання «хто готовий торгувати», стрічка — «хто вже торгує».',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке спуфінг у біржовому стакані?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спуфінг — це маніпулятивна тактика, при якій великі гравці виставляють великі лімітні заявки без наміру їх виконувати. Мета — створити ілюзію попиту або пропозиції, спровокувати рух ціни, а потім швидко скасувати заявки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке айсберг-ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Айсберг-ордер (Iceberg Order) — це прихована лімітна заявка, яка розбивається на багато дрібних частин. У стакані видно лише малу частину, а повний обсяг прихований. Це дозволяє великим гравцям входити в позицію непомітно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити маніпуляцію в стакані?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ознаки маніпуляції: великі заявки раптово зникають перед виконанням, ордери з'являються та скасовуються з високою частотою, обсяг у стакані не відповідає реальним угодам у стрічці принтів.",
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
      '@id': 'https://arapov.trade/uk/freestudying/stockorderbook#howto',
      name: 'Як аналізувати біржовий стакан та стрічку принтів',
      description:
        'Покрокова інструкція з читання Order Book і Time & Sales для пошуку точок входу',
      totalTime: 'PT25M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Відкрийте біржовий стакан',
          text: 'Налаштуйте відображення Order Book на вашій торговій платформі. Оберіть потрібну глибину — зазвичай 10-20 рівнів достатньо.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте великі заявки',
          text: 'Знайдіть рівні з аномально високим обсягом заявок. Це потенційні зони підтримки (великі Bid) або опору (великі Ask).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відкрийте стрічку принтів',
          text: 'Додайте вікно Time & Sales поруч зі стаканом. Налаштуйте фільтр для відображення лише великих угод.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Порівняйте стакан і стрічку',
          text: 'Перевірте, чи виконуються великі заявки зі стакана. Якщо заявки стоять, але угод немає — можлива маніпуляція.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Шукайте патерни активності',
          text: 'Слідкуйте за поглинанням, айсберг-ордерами та кластерами великих угод. Це сигнали присутності інституційних гравців.',
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
      '@id': 'https://arapov.trade/uk/freestudying/stockorderbook#glossary',
      name: 'Глосарій біржового стакана',
      inLanguage: 'uk',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description:
            'Біржовий стакан — таблиця активних лімітних заявок на купівлю та продаж.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Time & Sales',
          description:
            'Стрічка принтів — потік даних про виконані ринкові угоди в реальному часі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid',
          description:
            'Лімітна заявка на купівлю, розташована нижче поточної ринкової ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask',
          description:
            'Лімітна заявка на продаж, розташована вище поточної ринкової ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'Спред — різниця між найкращою ціною купівлі (Bid) та продажу (Ask).',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spoofing',
          description:
            'Спуфінг — маніпулятивна тактика з фіктивними заявками для створення хибного попиту.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg Order',
          description:
            'Айсберг-ордер — прихована заявка, розбита на дрібні частини для маскування обсягу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Absorption',
          description:
            'Поглинання — ситуація, коли лімітні ордери поглинають ринкові без руху ціни.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
