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
  selector: 'app-home-uk-blog-sixteen',
  templateUrl: './home-uk-blog-sixteen.component.html',
  styleUrl: './home-uk-blog-sixteen.component.scss',
})
export class HomeUkBlogSixteenComponent implements OnInit {
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
      'Ethereum (ETH): як аналізувати та торгувати | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке Ethereum, як працюють смартконтракти та dApps, чим ETH відрізняється від біткоїна і які перспективи у мережі.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

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
          headline: 'Ethereum у трейдингу: особливості аналізу ETH',
          description:
            'Що таке Ethereum, як працюють смартконтракти та dApps, чим ETH відрізняється від біткоїна і які перспективи у мережі.',
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
            '@id': 'https://arapov.trade/uk/freestudying/ethereum-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ethereum.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюта',
          keywords: 'ethereum',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чим Ethereum відрізняється від Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Біткоїн це насамперед цифрові гроші з межею емісії у 21 мільйон монет. Ethereum це платформа для смарт-контрактів і застосунків, а його монета ETH ще й оплачує операції в мережі. <strong>Коротко:  </strong> біткоїн про зберігання цінності, ефір про програмованість.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як аналізувати Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так само, як будь-який ринок: через рівні підтримки й опору і через обсяг. Я шукаю сліди великого капіталу й хибні проколи. Єдине застереження в тому, що обсягам на нерегульованих біржах не можна вірити сліпо.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому важливе співвідношення ETH/BTC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бо ефір сильно залежить від біткоїна і часто ходить за ним. Співвідношення ETH до BTC показує відносну силу: росте, отже ефір сильніший за ринок, падає, отже слабший. Це корисний контекст перед угодою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ризики торгівлі Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Висока волатильність, залежність від біткоїна й тонша ліквідність, ніж у BTC, плюс регуляторні й технічні ризики. Тому особливо важливі контроль ризику, стоп-лосс і вхід тільки тими коштами, які не страшно втратити.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке газ (gas) в Ethereum і чому комісії стрибають?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Газ це плата за кожну операцію в мережі, її рахують у гвеях (частках ETH). Розмір комісії залежить від завантаження мережі: що більше охочих провести транзакції, то дорожчий газ. Тому в пікові години перекази й угоди коштують помітно дорожче, а різкі стрибки комісій зазвичай збігаються зі сплесками активності в мережі.',
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
      '@id': 'https://arapov.trade/uk/freestudying/ethereum-guide#howto',
      name: 'Як розібратись і застосувати: Ethereum у трейдингу і як аналізувати ETH',
      description:
        'Покроковий розбір теми та її практичне застосування в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Що таке Ethereum і чим він відрізняється від Bitcoin',
          text: 'Ethereum — це децентралізована блокчейн-платформа для смарт-контрактів і застосунків, у якої є власна монета ETH, що працює і як актив, і як плата за операції в мережі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Що визначає ETH: смарт-контракти, газ, стейкінг і The Merge',
          text: 'Чотири стовпи ETH: смарт-контракти, газ (плата за операції), стейкінг і The Merge (перехід на Proof of Stake).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Технічний аналіз Ethereum: рівні та обсяги',
          text: 'Хороша новина для трейдера: ETH це такий самий графік, як і будь-який інший, і торгується він за тими ж законами попиту й пропозиції.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Кореляція ETH/BTC: як співвідношення впливає на торгівлю',
          text: 'Головне, що треба тримати в голові при торгівлі ETH: він сильно залежить від біткоїна.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ризики торгівлі Ethereum: ліквідність і волатильність',
          text: 'Ризики в ETH ті самі, що в усієї крипти, тільки їх корисно знати в обличчя.',
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
      name: 'Глосарій термінів статті',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ethereum',
          description:
            'Ethereum — це децентралізована блокчейн-платформа для смарт-контрактів і застосунків, у якої є власна монета ETH, що працює і як актив, і як плата за операції в мережі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Газ (gas fee)',
          description:
            'Газ (gas fee) це плата за кожну операцію в мережі Ethereum, яку вимірюють у гвеях; при високому навантаженні на мережу комісія зростає.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'The Merge',
          description:
            'The Merge це перехід Ethereum у вересні 2022 року з майнінгу (Proof of Work) на стейкінг (Proof of Stake), який різко знизив енергоспоживання мережі.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
