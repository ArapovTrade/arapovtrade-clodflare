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
  selector: 'app-home-uk-blog-four',
  templateUrl: './home-uk-blog-four.component.html',
  styleUrl: './home-uk-blog-four.component.scss',
})
export class HomeUkBlogFourComponent implements OnInit {
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
    this.titleService.setTitle('Концепція Smart Money (SMC) | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке Smart Money Concept: структура ринку, ліквідність, Order Blocks і FVG. Як торгують великі гравці і як читати їхні сліди.',
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
          headline:
            'Smart Money: повний гайд по концепції розумних грошей у трейдингу',
          description:
            'Що таке Smart Money Concept: структура ринку, ліквідність, Order Blocks і FVG. Як торгують великі гравці і як читати їхні сліди.',
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
            '@id': 'https://arapov.trade/uk/freestudying/smart-money-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneyconceptsguide.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Smart Money',
          keywords:
            "Smart Money, розумні гроші, полювання за стопами, хибний пробій, пастки Smart Money, ордер-блок, ліквідність, SMC, об'ємний аналіз",
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
          name: 'Хто такі Smart Money простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це великі професійні учасники ринку: банки, фонди й маркетмейкери. У них великий капітал і доступ до інформації, тому саме вони рухають ціну, а роздрібний натовп частіше йде слідом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим Smart Money відрізняються від роздрібних трейдерів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Підходом. Натовп торгує на емоціях, поспішає й женеться за рухом, купуючи дорого. Великі діють холодно, за планом і з терпінням, купуючи дешево та продаючи дорого.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке полювання за стопами (Stop Hunting)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це навмисний рух ціни до зон скупчення стоп-лосів, щоб вибити їх і зібрати ліквідність. Великі гравці продавлюють ціну туди, де стоять стопи натовпу, забирають ці заявки й розвертають ринок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити хибний пробій від справжнього?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Головна ознака це об'єм. Справжній пробій іде на зростаючому об'ємі й закріплюється за рівнем, а хибний вискакує на тонкому об'ємі та швидко повертається в діапазон. Швидкий розворот після проколу це явна пастка.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як побачити Smart Money на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "За слідами: аномальними сплесками об'єму, зняттям ліквідності через хибні проколи рівнів і фазами накопичення та розподілу. Головний інструмент тут об'ємний аналіз, без нього будь-яка зона це гадання.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як захиститися від маніпуляцій Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Не ставте стоп у найочевидніших місцях, впритул за екстремумом чи круглим рівнем, давайте йому запас. Не заходьте в момент проколу, а дочекайтеся, поки пастка відпрацює й ціна підтвердить розворот на об'ємі.",
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
      '@id': 'https://arapov.trade/uk/freestudying/smart-money-guide#howto',
      name: 'Як читати ринок за концепцією Smart Money',
      description:
        "Покроковий розбір: хто такі розумні гроші, як вони маніпулюють ціною і як іти за ними по сліду в об'ємі",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, хто такі Smart Money',
          text: 'Smart Money це великі учасники з великим капіталом та інформацією: банки, фонди й маркетмейкери, які купують дешево й продають дорого.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розберіться, як вони набирають позицію',
          text: "Великий капітал дробить об'єм на дрібні та айсберг-ордери, тихо накопичуючи позицію внизу й розподіляючи її нагорі за логікою Вайкоффа.",
        },
        {
          '@type': 'HowToStep',
          name: 'Побачте фази Вайкоффа за Smart Money',
          text: 'Великий капітал працює за сценарієм Вайкоффа: накопичення в боковику внизу, тренд по шляху найменшого опору й розподіл нагорі; падіння часто починається через дефіцит попиту, а не агресію продавців.',
          position: 3,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Зрозумійте механіку контролю',
          text: 'Контроль це робота з передбачуваністю натовпу й ліквідністю біля очевидних рівнів, а не таємна змова проти вас.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Розпізнавайте пастки й хибний пробій',
          text: "Полювання за стопами й хибний пробій вибивають стопи натовпу; відрізняє хибний прокол від справжнього об'єм.",
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Шукайте слід на графіку',
          text: "Великого видають сплеск об'єму, зняття ліквідності проколом і боковик накопичення, але без об'єму будь-яка зона це гадання.",
        },
        {
          '@type': 'HowToStep',
          name: "Підтверджуйте слід об'ємом, а не лише ціною",
          text: "Ордер-блоки й імбаланси за чистою ціною легко підігнати заднім числом; додавайте біржовий об'єм з CME як реальний слід великого капіталу, адже підвищений об'єм на зростанні видає покупця, на падінні продавця.",
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Опануйте елементи SMC',
          text: "Ліквідність, ордер-блок, імбаланс і структура (BOS і CHoCH) це інструменти концепції, але новачку важливіші структура й об'єм.",
        },
        {
          '@type': 'HowToStep',
          name: 'Не вірте міфам SMC і тримайте ризик',
          text: 'Маніпуляція це не змова проти вас, а потреба великого капіталу в ліквідності біля скупчень стопів; не заходьте в кожну зону поспіль і завжди торгуйте зі стопом і розрахунком ризику на угоду.',
          position: 9,
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Заходьте за великим після пастки',
          text: 'Знайдіть імпульсний рівень, дочекайтеся захоплення ліквідності й хибного проколу, і заходьте за великим зі стопом за прокол при ризику до прибутку від 1:3.',
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
          name: 'Smart Money',
          description:
            'Великі професійні учасники ринку, які мають великий капітал і доступ до інформації, недоступної звичайному трейдеру; дослівно розумні гроші.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Навмисний рух ціни до зон, де скупчилися стоп-лоси трейдерів, щоб вибити ці заявки й використати їх як ліквідність; українською збір стопів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопичення',
          description:
            'Боковик, частіше після довгого падіння, у якому великий капітал тихо набирає позицію в наляканого натовпу, що розпродає активи внизу; зовні нудний діапазон, у якому закладається майбутній рух.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
