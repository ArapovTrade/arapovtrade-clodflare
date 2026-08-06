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
  selector: 'app-home-uk-blog-fifty-nine',
  templateUrl: './home-uk-blog-fifty-nine.component.html',
  styleUrl: './home-uk-blog-fifty-nine.component.scss',
})
export class HomeUkBlogFiftyNineComponent implements OnInit {
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
      'Нейромережі та ШІ в трейдингу: що вміють | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що нейромережі реально вміють на ринку, а що їм не до снаги, чому ШІ не передбачає майбутнє і як використати його як інструмент, а не оракула.',
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
            'ШІ в трейдингу і прогноз ціни: що нейромережі вміють і де їхня межа',
          description:
            'Що нейромережі реально вміють на ринку, а що їм не до снаги, чому ШІ не передбачає майбутнє і як використати його як інструмент, а не оракула.',
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
            '@id': 'https://arapov.trade/uk/freestudying/ai-in-trading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ai-trading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'ШІ в трейдингу',
          keywords:
            'ШІ в трейдингу, прогноз ціни, нейромережа, машинне навчання, перенавчання, математичне сподівання, ймовірність, Вайкофф',
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
          name: 'Чи може нейромережа передбачити ціну акції чи біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Надійно ні, і це стосується і нейромережі, і людини. ШІ непогано ловить закономірності в минулих даних і видає ймовірні сценарії, але з подовженням горизонту точність падає, і вже на дистанції в місяць-три опускається нижче половини, тобто до випадкового вгадування. Ціна змінюється тоді, коли змінюються очікування натовпу та дії великого капіталу, а не за розкладом, який можна обчислити наперед.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке ШІ в трейдингу простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це використання нейромереж і машинного навчання, щоб розбирати ринок: перемелювати дані, знаходити закономірності та збирати ймовірні сценарії. На практиці це найчастіше чат-сервіси й аналітичні моделі, чия задача — допомогти вам думати, а не натискати кнопки за вас. Ні угод, ні управління рахунком такі сервіси зазвичай на себе не беруть.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що нейромережа реально вміє в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найсильніша вона не в передбаченні ринку, а в роботі з вашою ж історією. Дайте їй журнал угод, і за хвилину отримаєте картину, де й коли ви зливаєте частіше і в які моменти руйнується дисципліна. Заодно вона відсіє неліквід, прожене логіку стратегії й тицьне в її слабкі місця. Але все це відображення вашого минулого, а не погляд у майбутнє, і прибутку вона не обіцяє.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи замінить ШІ трейдера та його метод?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні. Знання нейромережі взяті з минулого, а ринок без кінця перекроюють свіжі учасники, новини й настрій натовпу, тож модель застаріває, а вигадлива ще й липне до історії через перенавчання. Її місце помічника поверх вашої системи, але не на її місці. Куди входити, де ставити стоп і яким ризиком оперувати, визначає метод і дисципліна, а не виданий моделлю відповідь.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як заробляти, якщо ціну не можна передбачити?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Через позитивне математичне сподівання, а не через вгадування кожної угоди. За співвідношення ризику до прибутку 1:3 система тримається в плюсі навіть за сорока відсотків прибуткових угод. Близько третини угод неминуче збиткові, а мінуси йдуть серіями, тому ризик на угоду тримають крихітним, у районі одного-двох відсотків, і завжди зі стопом.',
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
      '@id': 'https://arapov.trade/uk/freestudying/ai-in-trading#howto',
      name: 'Як розуміти ШІ в трейдингу',
      description:
        'Покроковий розбір того, що таке ШІ в трейдингу, чому точного прогнозу ціни немає і як заробляти на ймовірності та математичному сподіванні',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що таке ШІ в трейдингу',
          text: 'ШІ в трейдингу це аналітик у форматі діалогу, який перебирає дані й видає ймовірні сценарії, але угоду не виконує й рахунком не керує.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Усвідомте, що точного прогнозу ціни немає',
          text: 'Ні ШІ, ні людина не передбачать точну ціну; на дистанції в місяць-три точність моделі падає до випадкової, бо ціну рухають очікування натовпу та великий капітал.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Використовуйте ШІ як дзеркало своєї торгівлі',
          text: 'Завантажте журнал угод, і ШІ покаже, коли й на чому ви втрачаєте частіше; це дзеркало минулого, а не прогноз, і перенавчання робить модель тим гіршою в сьогоденні, чим точніше її підігнано під історію.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Тримайте ШІ асистентом поверх системи',
          text: 'Вхід, стоп і ризик один-два відсотки вирішує твій метод по обсягу й рівнях, а не підказка моделі; дисципліну ШІ за тебе не витримає.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Заробляйте на ймовірності та математичному сподіванні',
          text: 'Читай обсяг і великий капітал за Вайкоффом: за 1:3 система в плюсі навіть на сорока відсотках перемог, мінуси йдуть серіями, тому ризик на угоду крихітний і завжди зі стопом.',
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
          name: 'ШІ в трейдингу',
          description:
            'Застосування нейромереж і машинного навчання для аналізу ринку: обробки даних, пошуку закономірностей і підготовки ймовірних сценаріїв; на практиці зазвичай чат-сервіси й аналітичні моделі, що допомагають трейдеру думати, а не торгують за нього.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перенавчання',
          description:
            'Коли модель тим точніше переказує минуле, чим безпорадніше відгукується на сьогодення, тож вилизана під історію система впадає в ступор, щойно ринок змінив поведінку.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
