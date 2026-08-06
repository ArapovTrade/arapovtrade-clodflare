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
  selector: 'app-home-uk-blog-ninty-one',
  templateUrl: './home-uk-blog-ninty-one.component.html',
  styleUrl: './home-uk-blog-ninty-one.component.scss',
})
export class HomeUkBlogNintyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'Тільт у трейдингу: причини, ознаки та як уникнути | Arapov.trade',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Тільт у трейдингу — емоційний стан втрати контролю, що веде до знищення депозиту. Дізнайтеся причини, ознаки та методи боротьби з тільтом трейдера.',
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
          headline: 'Тільт у трейдингу: причини, ознаки та методи боротьби',
          description:
            'Повний посібник з тільту у трейдингу — емоційного стану, що руйнує дисципліну та депозит. Як розпізнати та запобігти тільту трейдера.',
          image: 'https://arapov.trade/assets/img/content/tilt1.png',
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
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/tiltintrading',
          },
          articleSection: 'Психологія трейдингу',
          keywords: [
            'тільт у трейдингу',
            'психологія трейдера',
            'емоції',
            'ризик-менеджмент',
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
          name: 'Що таке тільт у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тільт — це емоційний стан, за якого трейдер втрачає контроль над своїми діями та приймає рішення під впливом емоцій (страху, жадібності, гніву), а не на основі аналізу та стратегії. Термін прийшов з покеру та означає втрату самовладання.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ознаки вказують на тільт?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ознаки тільту: збільшення обсягу угод понад норму, торгівля проти тренду, ігнорування стоп-лоссів, перевищення денного ліміту угод, хаотичні входи та виходи з позицій, втрата впевненості у власній стратегії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим небезпечний тільт для трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тільт руйнує дисципліну та призводить до порушення ризик-менеджменту. Трейдер збільшує обсяги позицій, намагаючись відігратися, ігнорує сигнали стратегії та здійснює імпульсивні угоди. Це може призвести до повної втрати депозиту за короткий час.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як запобігти тільту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Профілактика тільту включає: достатній розмір депозиту, дотримання режиму сну та відпочинку, наявність чіткої торгової стратегії, суворий ризик-менеджмент з денними лімітами збитків, ведення журналу угод для аналізу помилок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що робити, якщо тільт вже почався?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При перших ознаках тільту необхідно негайно припинити торгівлю та закрити термінал. Переключіться на інше заняття — спорт, прогулянку, відпочинок. Проаналізуйте причини зриву. Повертайтеся до торгівлі лише після повного відновлення емоційної рівноваги.',
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
      name: 'Як впоратися з тільтом у трейдингу',
      description:
        'Покрокова інструкція з виходу з емоційного зриву та запобігання тільту',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розпізнайте ознаки тільту',
          text: 'Відстежуйте свій емоційний стан. Якщо ви відчуваєте роздратування, бажання відігратися або збільшуєте обсяги угод — це сигнали тільту.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Негайно припиніть торгівлю',
          text: 'При перших ознаках тільту закрийте всі позиції, вийдіть з терміналу. Не намагайтеся продовжити торгівлю в надії виправити ситуацію.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Переключіть увагу',
          text: 'Займіться фізичною активністю, прогуляйтеся на свіжому повітрі або відпочиньте. Це допоможе знизити рівень стресу та відновити ясність мислення.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проаналізуйте причини',
          text: 'Після відновлення вивчіть, що спровокувало тільт: серія збитків, втома, зовнішній стрес чи ейфорія після прибутку. Запишіть висновки в журнал.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Поверніться з планом',
          text: 'Відновлюйте торгівлю лише коли емоції під контролем. Почніть зі зменшених обсягів та суворо дотримуйтесь правил ризик-менеджменту.',
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
      name: 'Глосарій термінів психології трейдингу',
      description:
        "Ключові терміни, пов'язані з тільтом та емоційним контролем у торгівлі",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Тільт',
          description:
            'Емоційний стан втрати контролю, за якого трейдер приймає рішення під впливом емоцій, а не аналізу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система правил управління капіталом, що визначає допустимий розмір збитків та обсяг позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер для автоматичного закриття позиції при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Зниження торгового капіталу відносно максимального значення, виражене у відсотках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Надмірна кількість угод, що перевищує нормальний торговий план, часто ознака тільту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Журнал угод',
          description:
            'Записи про кожну торгову операцію для подальшого аналізу та виявлення помилок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова дисципліна',
          description:
            'Здатність дотримуватися правил стратегії незалежно від емоційного стану',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ейфорія',
          description:
            'Емоційний стан надмірної впевненості після серії прибуткових угод, що веде до підвищених ризиків',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
