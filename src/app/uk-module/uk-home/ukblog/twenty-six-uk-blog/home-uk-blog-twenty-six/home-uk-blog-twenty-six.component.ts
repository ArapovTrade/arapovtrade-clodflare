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
  selector: 'app-home-uk-blog-twenty-six',
  templateUrl: './home-uk-blog-twenty-six.component.html',
  styleUrl: './home-uk-blog-twenty-six.component.scss',
})
export class HomeUkBlogTwentySixComponent implements OnInit {
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
      'Психологія трейдингу: як контролювати емоції | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як емоції впливають на трейдинг: страх, жадібність, FOMO і тільт. Когнітивні викривлення і техніки, які допомагають торгувати за системою.',
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
            'Психологія трейдингу: чому вона важливіша за стратегію і як тримати емоції під контролем',
          description:
            'Як емоції впливають на трейдинг: страх, жадібність, FOMO і тільт. Когнітивні викривлення і техніки, які допомагають торгувати за системою.',
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
            '@id': 'https://arapov.trade/uk/freestudying/trading-psychology',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/emotionsaffect.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Психологія трейдингу',
          keywords:
            'психологія трейдингу, страх, жадібність, FOMO, тильт, когнітивні викривлення, дисципліна',
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
          name: 'Психологія в трейдингу справді важливіша за стратегію?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Так, бо навіть технічно грамотний трейдер втрачає гроші, якщо виконує угоди на емоціях. Ринок нейтральний, а програють найчастіше у власній голові: страх, жадібність і поспіх ламають будь-яку систему. Тому робота з психологією це не м'яка необов'язкова тема, а добра половина результату.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як страх і жадібність впливають на трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх змушує рано виходити з прибутку і тримати збиток у надії на повернення. Жадібність дзеркально штовхає передержувати позицію і ризикувати зайвим. Вони працюють у парі і гойдають трейдера з крайності в крайність, а після болючого збитку нерідко приходить тильт і бажання відігратися.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке FOMO і чому через нього купують на максимумах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO це страх упустити прибуток, коли ціна швидко йде без вас. Він вмикається, коли рух уже майже закінчився і про нього написали всі, тому новачок входить на самому верху, а професійні гроші в цей момент фіксують прибуток і віддають його тим, хто спізнився.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке тильт і чим він небезпечний?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тильт це стан, коли після болючого збитку трейдер втрачає контроль і починає мститися ринку, відкриваючи угоди одну за одною, аби швидко відігратися. Саме так зливають депозит за один вечір. Найкращий захист це пауза після збитку і жорсткий ліміт угод.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як прибрати емоції з торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Емоції не перемогти в моменті, їх виносять за дужки заздалегідь торговим планом: входи, виходи, стоп і ризик прописані до відкриття терміналу. Стоп прибирає болісну надію, маленький ризик знижує страх, а журнал і пауза після збитку не дають зірватися у відіграш.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як подолати страх перед входом в угоду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх входу майже завжди про надто великий ризик. Зменшіть частку рахунку на угоду до такої, за якої збиток не страшний, і заздалегідь пропишіть точку входу, стоп і ціль, щоб рішення приймав план, а не емоція в моменті. Коли ціна втрати для вас мала і сценарій заданий заздалегідь, рука перестає тремтіти над кнопкою, а відпрацювання угод на демо-рахунку додає спокою через звичку.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trading-psychology#howto',
      name: 'Як працювати з психологією в трейдингу',
      description:
        'Покроковий розбір головних психологічних пасток трейдера і того, що їм протиставити',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Прийміть, що результат вирішується в голові, а не на графіку',
          text: 'Ринок нейтральний, і один і той самий графік один трейдер торгує як казино, а інший як бізнес.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Навчіться бачити страх, жадібність і ейфорію у своїх рішеннях',
          text: 'Неприйняття втрат влаштоване так, що біль від збитку відчувається сильніше, ніж радість від рівного прибутку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розпізнавайте FOMO і не входьте на максимумах',
          text: 'FOMO вмикається рівно тоді, коли рух уже майже закінчився і в ринок прибігли останні.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Зрозумійте, як натовп віддає гроші крупному капіталу',
          text: 'Ринок переносить гроші від емоційного натовпу до холодного капіталу: натовп продає у страху на дні у фазі накопичення і купує в ейфорії на верхах у фазі розподілу, а крупний капітал стоїть на іншому боці його емоцій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Помічайте когнітивні викривлення замість боротьби силою волі',
          text: 'Когнітивні викривлення це вбудовані шаблони мислення, які на ринку підсовують зручну картину замість холодної оцінки.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Переживайте просадку і серію без відіграшу',
          text: 'Збиткова серія це нормальна статистика прибуткової системи, а не поломка; тримайте малий ризик на угоду, щоб просадка не вибивала вас емоційно, і ведіть журнал, відділяючи погане рішення від невдалого результату.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Винесіть емоції за дужки планом, стопом і журналом',
          text: 'Емоції не можна перемогти в моменті, їх потрібно винести за дужки заздалегідь торговим планом.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Пройдіть шлях від азарту до дисципліни усвідомлено',
          text: 'Психологія проходить стадії, від безтурботності новачка через страх і пошук грааля до зрілості, де угода це рядок у журналі; шлях не можна перестрибнути, лише скоротити, змінюючи підхід до рішень, а не шукаючи чарівний індикатор.',
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
          name: 'FOMO',
          description:
            'Страх упущеної вигоди: гостра тривога від думки про пропущену можливість заробити, що штовхає входити в ринок на емоціях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Стан, у якому після болючого збитку трейдер втрачає контроль і починає мститися ринку серією угод, щоб швидко відігратися.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Когнітивні викривлення',
          description:
            "Систематичні помилки мислення, через які трейдер оцінює ринок і свої угоди необ'єктивно і приймає ірраціональні рішення.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова дисципліна',
          description:
            'Звичка діяти строго за заздалегідь прописаними правилами входу, виходу і ризику, а не за миттєвими почуттями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Неприйняття втрат',
          description:
            'Когнітивне викривлення, за якого біль збитку переживається сильніше за радість від рівного прибутку, через що трейдер ріже прибуток рано, а збиток тримає до останнього.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Тимчасове зниження торгового рахунку після низки збиткових угод; у прибуткової на дистанції стратегії збиткові серії статистично нормальні і не означають поломку методу.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
