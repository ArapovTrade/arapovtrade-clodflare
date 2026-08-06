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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-sixty-four',
  templateUrl: './home-uk-blog-sixty-four.component.html',
  styleUrl: './home-uk-blog-sixty-four.component.scss',
})
export class HomeUkBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
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
      'Торгова система трейдера — практичний посібник з прикладами угод',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгова система трейдера — покрокова інструкція з реальними прикладами угод. Як знаходити точки входу, виставляти стоп-лос та фіксувати прибуток.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

    this.gerRandom();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
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
          headline: 'Стратегії трейдингу з нуля',
          description:
            'Дізнайтесь практичні рекомендації з трейдингу: торгова система, точки входу, мані-менеджмент і ризики від ArapovTrade.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/practic',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/prakticuk.jpg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Приклади угод',
          keywords: 'торгова стратегія',
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
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
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
      inLanguage: 'uk',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке торгова стратегія?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгова стратегія це заздалегідь розроблений набір чітких правил, що регулюють дії трейдера на всіх етапах: від входу в угоду до виходу. Вона усуває імпровізацію, емоційні коливання й субʼєктивність.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому трейдинг без стратегії призводить до збитків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Без робочої стратегії трейдинг перетворюється на азартну гру, де шанси різко проти вас. Комісії, спред, емоції й нестриманий ризик працюють у мінус, тому переважна більшість трейдерів без системи втрачають депозит.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке правило 3:1 у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Правило 3:1 означає, що на кожен долар ризику потенційний прибуток має становити мінімум 3 долари. Відстань до цілі в пунктах має бути в 3 рази більшою, ніж відстань до стоп-лосса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке хибний пробій рівня?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Хибний пробій це спроба підняти або опустити ціну за рівень підтримки або опору, яка не отримує продовження. Часто відбувається на підвищених обсягах і використовується Smart Money для набору позицій і збору ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який WinRate вважається робочим для торгової системи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При роботі з рівнями нормальним вважається WinRate близько 60-65%, тобто приблизно 63 прибуткові угоди зі 100. Сам по собі він нічого не гарантує: важлива звʼязка з правилом 3:1 і контролем ризику на дистанції.',
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
      inLanguage: 'uk',
      name: 'Як знайти точку входу за торговою системою',
      description:
        'Покроковий алгоритм визначення точки входу в угоду на продаж від рівня опору за правилами Price Action і Smart Money.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Визначити рівень',
          text: 'Провести діапазон опору за старшим таймфреймом (×4) і позначити його як зону інтересу.',
        },
        {
          '@type': 'HowToStep',
          name: 'Дочекатися пін-бар',
          text: 'У діапазоні рівня дочекатися пін-бар як першу ознаку слабкості покупців і дефіциту попиту.',
        },
        {
          '@type': 'HowToStep',
          name: 'Ідентифікувати хибний пробій',
          text: 'Розпізнати спробу пробити рівень на підвищеному обсязі, яка не отримує продовження і збирає ліквідність.',
        },
        {
          '@type': 'HowToStep',
          name: 'Увійти на ведмежому поглинанні',
          text: 'Відкрити угоду на продаж при пробої мінімуму бару хибного пробою за патерном ведмеже поглинання.',
        },
        {
          '@type': 'HowToStep',
          name: 'Виставити стоп-лосс',
          text: 'Поставити захисний ордер за макушку бару хибного пробою плюс пара пунктів на комісію біржі або брокера.',
        },
        {
          '@type': 'HowToStep',
          name: 'Визначити ціль і перевірити 3:1',
          text: 'Ціль ставиться на протилежний імпульсний рівень; угода береться лише якщо потенційний прибуток щонайменше втричі перевищує ризик.',
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
      '@id': 'https://arapov.trade/uk/freestudying/practic#terms',
      inLanguage: 'uk',
      name: 'Терміни торгової стратегії',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торгова стратегія',
          description:
            'Заздалегідь розроблений набір чітких правил входу, виходу й контролю ризику, що замінює імпровізацію та емоції логікою і статистикою.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Спроба вивести ціну за рівень підтримки або опору без продовження руху, часто на підвищеному обсязі.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмеже поглинання',
          description:
            'Патерн Price Action, що вказує на переважання продавців; сигнал входу на продаж при пробої мінімуму бару хибного пробою.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Правило 3:1',
          description:
            'Умова, за якої на кожен долар ризику закладається мінімум 3 долари потенційного прибутку.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WinRate',
          description:
            'Частка прибуткових угод у торговій системі; при роботі з рівнями зазвичай близько 60-65%.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Profit Factor',
          description:
            'Відношення сумарного прибутку до сумарного збитку; мінімально достатнім вважається 1.8-2 з урахуванням комісій.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Maximal DrawDown',
          description:
            'Максимальна просадка депозиту за період; стоп-лосс обмежує її глибину, але не скасовує.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мані-менеджмент',
          description:
            'Управління капіталом: який відсоток депозиту використовувати в угоді і як переносити ризик з угоди в угоду.',
          inDefinedTermSet:
            'https://arapov.trade/uk/freestudying/practic#terms',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
