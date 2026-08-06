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
  selector: 'app-home-uk-six',
  templateUrl: './home-uk-six.component.html',
  styleUrl: './home-uk-six.component.scss',
})
export class HomeUkSixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Алгоритмічні стейблкоїни: як працюють | Повний посібник'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Алгоритмічні стейблкоїни: принципи роботи, механізми стабілізації, популярні проекти. Переваги та ризики децентралізованих стабільних монет.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stablecoins.webp',
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/stablecoins',
          },
          headline:
            'Алгоритмічні стейблкоїни: як працюють децентралізовані стабільні монети',
          description:
            'Алгоритмічні стейблкоїни: принципи роботи, механізми стабілізації, популярні проекти. Переваги та ризики децентралізованих стабільних монет.',
          image: 'https://arapov.trade/assets/img/content/stablecoins.webp',
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
          datePublished: '2025-06-15T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Що таке алгоритмічний стейблкоїн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Алгоритмічний стейблкоїн — це криптовалюта, що підтримує стабільний курс без забезпечення фіатними резервами. Стабільність досягається через автоматичні механізми регулювання пропозиції токенів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим алгоритмічні стейблкоїни відрізняються від забезпечених?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Забезпечені стейблкоїни підкріплені резервами в доларах. Алгоритмічні регулюють курс через смарт-контракти та математичні моделі, що робить їх децентралізованими, але ризикованішими.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому стався крах TerraUSD (UST)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Крах UST у травні 2022 року стався через масовий відтік ліквідності. Алгоритм не впорався з тиском продажів, що призвело до гіперінфляції LUNA та обвалу обох монет.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які алгоритмічні стейблкоїни найстійкіші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найстійкішими є гібридні моделі: FRAX (часткове забезпечення плюс алгоритм) та LUSD (повне криптозабезпечення Ethereum).',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи безпечно інвестувати в алгоритмічні стейблкоїни?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Алгоритмічні стейблкоїни є високоризиковими активами. Диверсифікуйте між забезпеченими та алгоритмічними стейблкоїнами.',
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
      name: 'Як безпечно використовувати алгоритмічні стейблкоїни',
      description:
        'Керівництво з мінімізації ризиків при роботі з алгоритмічними стейблкоїнами',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Дослідіть механізм стабілізації',
          text: 'Вивчіть документацію проекту: як працює алгоритм, які токени використовуються для балансування.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Перевірте команду та аудити',
          text: 'Переконайтеся, що проект пройшов незалежний аудит смарт-контрактів.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Диверсифікуйте портфель',
          text: 'Розподіліть кошти між забезпеченими (USDC, DAI) та алгоритмічними стейблкоїнами.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Моніторте прив'язку до долара",
          text: 'Регулярно відстежуйте курс стейблкоїна відносно долара.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Будьте готові до виходу',
          text: 'При перших ознаках дестабілізації виводьте кошти в надійніші активи.',
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
      name: 'Глосарій термінів алгоритмічних стейблкоїнів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Алгоритмічний стейблкоїн',
          description:
            'Криптовалюта, що підтримує стабільний курс через автоматичні механізми',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ребазинг',
          description: 'Автоматична зміна кількості токенів у гаманцях',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смертельна спіраль',
          description: 'Каскадне падіння вартості при втраті довіри',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Двотокенна модель',
          description: 'Система з допоміжним токеном для стабілізації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спалювання токенів',
          description: 'Знищення монет для скорочення пропозиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гібридний стейблкоїн',
          description: 'Поєднання забезпечення з алгоритмічною регуляцією',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Арбітражний механізм',
          description: 'Стимули для вирівнювання курсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Депег',
          description: "Втрата прив'язки до базового активу",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Синтетичний стейблкоїн',
          description: 'Забезпечений заставою в криптовалютах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідаційний поріг',
          description: 'Рівень автоматичної ліквідації позицій',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
