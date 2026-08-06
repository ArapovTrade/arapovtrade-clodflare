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
  selector: 'app-home-uk-blog-fourty-one',
  templateUrl: './home-uk-blog-fourty-one.component.html',
  styleUrl: './home-uk-blog-fourty-one.component.scss',
})
export class HomeUkBlogFourtyOneComponent implements OnInit {
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
      'Трейдинг для початківців: з чого почати | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг для початківців з нуля: як влаштовані ринки, які потрібні навички, перші кроки та типові помилки новачків. Гайд від Arapov.trade.',
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
    console.log('path:', path);
    console.log('index:', index);
    if (index == 0) {
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
          headline: 'Трейдинг з нуля для новачка: з чого почати у 2026 році',
          description:
            'Трейдинг для початківців з нуля: як влаштовані ринки, які потрібні навички, перші кроки та типові помилки новачків. Гайд від Arapov.trade.',
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
            '@id': 'https://arapov.trade/uk/freestudying/trading-for-beginners',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingbasics.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для початківців',
          keywords:
            'трейдинг для початківців, трейдинг з нуля, лонг і шорт, демо-рахунок, помилки новачків',
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
          name: 'Що таке трейдинг простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це спосіб заробляти на русі ціни: берете актив дешевше, віддаєте дорожче, або навпаки в шорт. Від інвестицій відрізняється строком, тут хвилини і тижні, а не роки. І це ремесло з порогом входу, де прибуток проявляється лише на довгій череді угод.',
          },
        },
        {
          '@type': 'Question',
          name: 'З чого почати трейдинг новачкові у 2026 році?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спочатку теорія і вибір методу, потім тренування на демо до рівного плюса на серії, далі брокер під регуляцією і лише після цього невеликий живий рахунок зі стопом і скромним ризиком. На старті найважливіше не гнати і не ставити багато.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим лонг відрізняється від шорта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лонг це купівля з розрахунком на ріст ціни, шорт це продаж узятого в борг активу з розрахунком на падіння. Шорт складніший і небезпечніший для новачка: збиток у ньому теоретично не обмежений зверху, бо ціна вгору може йти скільки завгодно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки угод зі ста бувають збитковими?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінусові угоди є й у робочої системи, грубо тридцять зі ста, і це норма. Небезпечніший розкид: червоні входи вміють іти чередою по пʼять-десять поспіль, і на великому ризику така смуга випалює рахунок, хоча по дистанції ви були б у плюсі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу потрібно, щоб стати стабільним трейдером?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не тижні, а роки практики. Сам метод береться за пару-трійку місяців, важче напрацювати витримку: триматися правил, не задирати ризик і не мстити ринку. Прискорюють дорогу практика і щоденник угод, а не гора переглянутих відео.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна швидко розбагатіти на трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні. Це професія, а не каса швидких грошей: дохід приходить через навчання, дисципліну і час, а мисливці за легким зазвичай його і втрачають. Прибуткова торгівля нудна на вигляд, це повтор одних і тих самих кроків за правилами.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trading-for-beginners#howto',
      name: 'Як почати трейдинг з нуля новачкові',
      description:
        'Покроковий шлях початківця: від розуміння основ до переходу на реальний рахунок',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Що таке трейдинг простими словами',
          text: 'Трейдинг це робота з фінансовими активами: їх купують і продають, щоб заробити на русі ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Чи варто взагалі йти в трейдинг і кому він не підходить',
          text: 'Перш ніж учитися як, чесно дайте собі відповідь на питання чи варто.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Лонг і шорт: як заробляють на зростанні і на падінні',
          text: 'Заробити в трейдингу можна в обидва боки, і це перше, що варто вкласти в голову.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Який метод обрати новачкові: чому я дивлюся обсяг, а не індикатори',
          text: 'Метод це те, на що ви дивитеся, коли вирішуєте, купувати чи продавати.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Що торгувати новачкові: один інструмент замість десяти',
          text: 'Найчастіша помилка на старті щодо вибору це розпорошення: новачок одночасно дивиться акції, крипту, валюту і десяток монет.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Як почати торгувати на біржі: покроковий шлях',
          text: 'Дорогу новачка я ділю на щаблі, і важливіша тут не швидкість, а черговість.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Скільки грошей потрібно для старту і яка дохідність реальна',
          text: 'Питання з якої суми заходити новачок ставить першим, хоча на старті воно не головне.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Як влаштована одна угода: вхід, стоп і точка виходу',
          text: 'Раз мова дійшла до реального рахунку, розберемо, з чого взагалі складається одна угода.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Демо-рахунок: чого він реально вчить, а чого ні',
          text: 'Демо це інструмент, який хвалять усі, але мало хто чесно говорить про його межі.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Головні помилки новачків, через які втрачають депозит',
          text: 'Рік за роком картина втрат одна: ринок майже не винен, джерело сидить у самій людині.',
        },
        {
          '@type': 'HowToStep',
          position: 11,
          name: 'Самонавчання трейдингу: дорожня карта і щоденник угод',
          text: 'Опанувати торгівлю самотужки реально, я живе тому підтвердження.',
        },
        {
          '@type': 'HowToStep',
          position: 12,
          name: 'Що відрізняє успішного трейдера і скільки займає шлях',
          text: 'Від відповіді чекають якогось секрету чи диво-стратегії.',
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
          name: 'Трейдинг',
          description:
            'Купівля і продаж фінансових активів з метою заробити на зміні їхньої ціни на короткому горизонті.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лонг',
          description:
            'Довга позиція: купівля активу з розрахунком на ріст його ціни і заробіток на цьому рості.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шорт',
          description:
            'Коротка позиція: продаж узятого в борг активу з розрахунком викупити його дешевше після падіння ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description:
            'Тренувальний рахунок з віртуальними грошима і реальними котируваннями, на якому відпрацьовують торгівлю без ризику для капіталу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Усереднення збитку',
          description:
            'Долив до збиткової позиції замість закриття за стопом у надії відігратися, через що трейдер збільшує ризик і втрати.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
