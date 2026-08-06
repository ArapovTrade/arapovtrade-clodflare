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
  selector: 'app-home-uk-blog-sixty-seven',
  templateUrl: './home-uk-blog-sixty-seven.component.html',
  styleUrl: './home-uk-blog-sixty-seven.component.scss',
})
export class HomeUkBlogSixtySevenComponent {
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
      'Обсяговий аналіз трендів: практичний посібник | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як використовувати обсяги для аналізу ринкових трендів. Фази тренду, індикатори обсягу, виявлення хибних пробоїв та стратегії Smart Money.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trendvolumeanalysis.webp',
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
            'https://arapov.trade/uk/freestudying/trendvolumeanalysis#article',
          headline: 'Обсяговий аналіз трендів: практичний посібник',
          description:
            'Дізнайтеся, як використовувати обсяги для аналізу ринкових трендів. Фази тренду, індикатори обсягу, виявлення хибних пробоїв та стратегії Smart Money.',
          image:
            'https://arapov.trade/assets/img/content/trendvolumeanalysis2.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
          },
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
          name: 'Що таке обсяговий аналіз у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обсяговий аналіз — це методика оцінки ринкової активності на основі кількості виконаних ордерів. Він дозволяє визначити істинність цінових рухів, виявити зони ліквідності та зрозуміти наміри великих учасників ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обсяги підтверджують силу тренду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сильний тренд супроводжується зростанням обсягів при русі в його напрямку та зниженням на корекціях. Якщо ціна росте на падаючих обсягах — тренд слабшає і можливий розворот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як виявити хибний пробій за допомогою обсягів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Істинний пробій супроводжується різким зростанням обсягів та продовженням руху. Хибний пробій відбувається на низьких обсягах із швидким поверненням ціни в діапазон.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори використовуються для аналізу обсягів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні інструменти: Volume Profile для розподілу по рівнях, Delta Volume для балансу покупок/продажів, Footprint Charts для кластерного аналізу, VWAP для середньозваженої ціни.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Point of Control (POC)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POC — це ціновий рівень з максимальним обсягом торгів за період. Він слугує зоною притягання ціни та часто виступає динамічною підтримкою або опором.',
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
      name: 'Як аналізувати тренди за допомогою обсягів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте фазу тренду',
          text: 'Оцініть, чи знаходиться ринок у накопиченні, імпульсі, розподілі чи корекції.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте Volume Profile',
          text: 'Знайдіть зони з високим обсягом (HVN) та низьким обсягом (LVN). POC показує рівень справедливої ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцініть Delta Volume',
          text: 'Порівняйте обсяг агресивних покупок та продажів для визначення домінуючої сторони.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевірте обсяг на пробоях',
          text: 'Істинний пробій рівня супроводжується різким зростанням обсягу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Шукайте дивергенції',
          text: 'Якщо ціна оновлює максимуми, а обсяги знижуються — тренд слабшає.',
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
      name: 'Глосарій обсягового аналізу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Обсяговий аналіз',
          description:
            'Методика оцінки ринкової активності на основі кількості виконаних угод.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Індикатор, що відображає розподіл обсягів по цінових рівнях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control',
          description:
            'Ціновий рівень з максимальним обсягом торгів за період.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Різниця між агресивними покупками та продажами за період.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'Кластерні графіки, що показують розподіл обсягів всередині свічок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description:
            'Середньозважена по обсягу ціна активу за торгову сесію.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OBV',
          description:
            'Індикатор накопиченого обсягу, що враховує напрямок ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за рівень із швидким поверненням назад.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопичення',
          description:
            'Період прихованого формування позицій великими учасниками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі інституційні учасники ринку з інформаційною перевагою.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
