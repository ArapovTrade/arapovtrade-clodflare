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
  selector: 'app-home-uk-blog-onehundred-four',
  templateUrl: './home-uk-blog-onehundred-four.component.html',
  styleUrl: './home-uk-blog-onehundred-four.component.scss',
})
export class HomeUkBlogOnehundredFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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

    this.titleService.setTitle('Торгівля Solana | Аналіз SOL та стратегії');
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгівля Solana SOL: технологія блокчейну, екосистема DeFi, торгові стратегії та управління ризиками для криптотрейдерів.',
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
          headline: 'Торгівля Solana: Повний посібник з ринку SOL',
          description:
            'Торгівля Solana SOL: технологія блокчейну, екосистема DeFi, торгові стратегії та управління ризиками для криптотрейдерів.',
          image: 'https://arapov.trade/assets/img/content/sol1.jpg',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-07-01T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/solana',
          },
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
          name: 'Чим Solana відрізняється від Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Solana використовує Proof of History, забезпечуючи 65,000+ TPS з фіналізацією менше секунди та комісіями до $0.01. Ethereum обробляє 15-30 TPS з вищими комісіями.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Proof of History?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Proof of History — інновація Solana, що створює криптографічні мітки часу до консенсусу. Це зменшує навантаження валідації та забезпечує високу пропускну здатність.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому Solana має збої?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевантаження мережі через активність ботів та спам-транзакції спричиняло збої. Валідатори не справлялися з надмірними транзакціями. Оновлення покращують стійкість.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що впливає на ціну SOL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові драйвери: зростання DeFi TVL, активність NFT-маркетплейсів, adoption розробниками, оновлення мережі, кореляція з Bitcoin.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи підходить Solana для торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SOL пропонує високу волатильність для активної торгівлі. Сильна ліквідність, чіткі технічні рівні та екосистемні каталізатори створюють регулярні можливості.',
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
      name: 'Як торгувати Solana',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Моніторте екосистему',
          text: 'Відстежуйте DeFi TVL, обсяги NFT, активність розробників.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Стежте за здоров'ям мережі",
          text: 'Моніторте кількість валідаторів, аптайм, пропускну здатність.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Аналізуйте кореляцію з Bitcoin',
          text: 'SOL часто підсилює рухи BTC. Використовуйте напрямок Bitcoin як фільтр.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Визначте технічні рівні',
          text: 'Позначте підтримку/опір від попередніх свінгів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте волатильністю',
          text: 'Консервативні розміри позицій. Денні рухи 20-30% можливі.',
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
      name: 'Термінологія Solana',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Solana',
          description: 'Високопродуктивний блокчейн для DeFi та Web3.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SOL',
          description: 'Нативний токен мережі Solana для комісій та стейкінгу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof of History',
          description:
            'Інновація консенсусу Solana для криптографічного впорядкування часу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TPS',
          description: 'Транзакцій на секунду — показник пропускної здатності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TVL',
          description: 'Загальна заблокована вартість в DeFi протоколах.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валідатор',
          description:
            'Оператор ноди, що забезпечує мережу та обробляє транзакції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейкінг',
          description:
            'Блокування SOL для отримання винагород та забезпечення мережі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description: 'Децентралізовані фінанси на блокчейні.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFT',
          description: 'Невзаємозамінні токени для цифрової власності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Епоха',
          description: 'Часовий період для розподілу винагород стейкінгу.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
