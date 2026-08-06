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
  selector: 'app-home-uk-blog-twenty-five',
  templateUrl: './home-uk-blog-twenty-five.component.html',
  styleUrl: './home-uk-blog-twenty-five.component.scss',
})
export class HomeUkBlogTwentyFiveComponent implements OnInit {
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
      'Усереднення та мартингейл у трейдингу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке усереднення і метод мартінгейла, чому вони здаються вигідними і як саме зливають депозит новачків. Психологія і математика ризику.',
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
            'Усереднення і мартингейл: чому доливати в збиток небезпечно',
          description:
            'Що таке усереднення і метод мартінгейла, чому вони здаються вигідними і як саме зливають депозит новачків. Психологія і математика ризику.',
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
            '@id': 'https://arapov.trade/uk/freestudying/averaging-martingale',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/averagingintrading.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Психологія трейдингу',
          keywords:
            'усереднення в трейдингу, метод мартингейла, усереднення проти тренду, психологія усереднення, ризик-менеджмент',
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
          name: 'Що таке усереднення в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це долив до вже відкритої позиції за іншою ціною, який зсуває вашу середню точку входу. Узяли біткоїн по десять тисяч, він осів до пʼяти, добрали ще один, і середня опустилася до семи з половиною. Для виходу в нуль тепер вистачить удвічі меншого ходу, тільки якщо долив іде проти тренду, він лише відсуває момент зливу депозиту, а не скасовує його.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому усереднення проти тренду небезпечне?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бо ви докуповуєте на слабкому ринку, а падає він часто саме затим, щоб винести впертих покупців. Долив без стопа знімає зі збитку стелю, і одна позиція здатна обнулити рахунок. Тренди йдуть далі, ніж здається: євро до долара у 2014-2015 роках сповзло з 1.40 приблизно до 1.05 за кілька місяців, і жодне усереднення там не рятувало.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке метод Мартингейла?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це подвоєння обсягу після кожної втрати в розрахунку перекрити всі збитки одним виграшем. Ставка летить угору по експоненті, один, два, чотири, вісім і далі, тож до сьомого збитку поспіль від вас вимагається вже у 128 разів більше за стартову суму. Ринок уміє тиснути позицію довше, ніж у трейдера лишається грошей на подвоєння, тому досить однієї затяжної серії мінусів, щоб рахунок обнулився.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому трейдер доливає в мінус?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Причина психологічна. Визнати збиток боляче, адже це значить визнати помилку, і замість стопа вмикаються заперечення й надія на розворот. Долив дає хибне відчуття контролю, але по суті це суперечка не з ринком, а з власним его, і маленький збиток він перетворює на великий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли усереднення припустиме?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лише в одному вигляді: у бік тренду, скромним обсягом і з обовʼязковим стопом на всю позицію. Так ви нарощуєте угоду, яка вже приносить прибуток на відкаті, а не намагаєтеся витягнути потопаючу. За моїм досвідом новачку краще про долив забути і спершу зміцніти на звичайній торгівлі з зрозумілим стопом і акуратним ризиком.',
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
      '@id': 'https://arapov.trade/uk/freestudying/averaging-martingale#howto',
      name: 'Як розібратись і застосувати: усереднення і мартингейл, і чому доливати в збиток небезпечно',
      description:
        'Покроковий розбір теми та її практичне застосування в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що таке усереднення і як рахується середня ціна',
          text: 'Усереднення — це долив до вже відкритої позиції за новою ціною заради зсуву середньої ціни входу.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розберіться, чому долив проти тренду зливає рахунок',
          text: 'Ось де зарита головна біда.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Побачте психологію за доливом у мінус',
          text: 'Корінь проблеми лежить глибше за техніку, він у голові.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Зрозумійте математику Мартингейла',
          text: 'Метод Мартингейла — це управління ставкою, за якого після кожного збитку обсяг наступної угоди подвоюється в розрахунку перекрити всі втрати одним виграшем.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Захистіться планом, фіксованим ризиком і доливом тільки за трендом',
          text: 'Хороша новина в тому, що від обох пасток є надійний захист, і це торговий план.',
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
          name: 'Усереднення',
          description:
            'Усереднення — це долив до вже відкритої позиції за новою ціною заради зсуву середньої ціни входу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Метод Мартингейла',
          description:
            'Метод Мартингейла — це управління ставкою, за якого після кожного збитку обсяг наступної угоди подвоюється в розрахунку перекрити всі втрати одним виграшем.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
