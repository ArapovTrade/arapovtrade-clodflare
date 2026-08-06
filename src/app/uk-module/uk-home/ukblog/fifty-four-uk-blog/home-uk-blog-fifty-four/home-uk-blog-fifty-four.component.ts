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
  selector: 'app-home-uk-blog-fifty-four',
  templateUrl: './home-uk-blog-fifty-four.component.html',
  styleUrl: './home-uk-blog-fifty-four.component.scss',
})
export class HomeUkBlogFiftyFourComponent implements OnInit {
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
    this.titleService.setTitle('Графічні патерни в трейдингу | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Графічні патерни технічного аналізу: трикутники, прапори, голова і плечі, подвійна вершина. Як їх знаходити і торгувати пробої.',
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
            'Чи працюють графічні фігури технічного аналізу: що реально, а що 50/50',
          description:
            'Графічні патерни технічного аналізу: трикутники, прапори, голова і плечі, подвійна вершина. Як їх знаходити і торгувати пробої.',
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
            '@id': 'https://arapov.trade/uk/freestudying/chart-patterns',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/keypraicepattern.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'графічні фігури технічного аналізу, цінові патерни, голова та плечі, подвійна вершина, трикутник, прапор і вимпел, чашка з ручкою, патерн 1-2-3',
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
          name: 'Чи працюють графічні фігури технічного аналізу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Сама собою фігура спрацьовує приблизно навпіл, і статистичної переваги на дистанції голий малюнок не дає. По-справжньому вона починає щось означати лише на сильному рівні та з підтвердженням обсягом. Відсотки успішності, що гуляють інтернетом, розходяться від половини до дев'яноста з гаком, бо надто багато залежить від того, хто і як рахував, тож кнопкою прибутку фігуру вважати не можна.",
          },
        },
        {
          '@type': 'Question',
          name: 'Яка фігура найнадійніша?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Надійних у сенсі гарантії немає, голий контур у всіх дає приблизно п'ятдесят на п'ятдесят. З усіх фігур мені ближчий прапор, бо за ним стоїть зрозуміла механіка: різкий імпульс показує, що один бік сильніший, а млявий відкат це пауза, а не розворот. Осібно тримається й патерн 1-2-3: у ньому читається логіка набору позиції великим капіталом, а вхід у точці 3 дає найкраще співвідношення ризику до прибутку.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому фігури спрацьовують приблизно 50 на 50?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бо картинка сама нічого не розвертає, ринок рухають учасники, які в неї повірили й заворушилися. Упізнавану фігуру бачить увесь натовп і ставить заявки в передбачуваних місцях, а великий капітал саме там збирає ліквідність: проколює межу, знімає стопи й нерідко йде в інший бік. Тому я дивлюся не на форму, а на рівень, хибний прокол та обсяг.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим розворотні фігури відрізняються від фігур продовження?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Розворотні натякають, що тренд видихається і може змінитися, і з'являються в кінці руху: це голова та плечі, подвійна вершина і подвійне дно. Фігури продовження кажуть, що після паузи тренд піде в той самий бік, і це прапор, вимпел, трикутник та чашка з ручкою. Будь-яку з них варто читати лише разом з обсягом і на старшому таймфреймі.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що використовувати замість графічних фігур?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обсяг, рівні та метод Вайкоффа. Я читаю, що робить великий капітал, а не намагаюся вгадати малюнок: на якому рівні захована ліквідність, чи був хибний прокол, що показує обсяг на пробої та ретесті. Знати фігуру при цьому все одно корисно, але як карту психології натовпу, а не як сигнал для сліпої торгівлі, і завжди зі стопом та невеликим ризиком на угоду.',
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
      '@id': 'https://arapov.trade/uk/freestudying/chart-patterns#howto',
      name: 'Як розібратися у графічних фігурах і не торгувати їх наосліп',
      description:
        'Покроковий розбір цінових патернів та їх грамотного застосування через рівень і обсяг',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що таке цінова фігура й звідки вона береться',
          text: "Цінова фігура це повторювана форма на графіку, яку мозок знаходить у хаосі, але ринок не зобов'язаний її поважати.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поділіть фігури на розворотні та продовження',
          text: 'Розворотні ловлять кінець тренду, продовження його паузу, і будь-яку читають лише разом з обсягом і на старшому таймфреймі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Вивчіть розворотні фігури',
          text: 'Голова та плечі й подвійна вершина з дном підтверджуються лише пробоєм лінії шиї на зрослому обсязі, до того це лише начерк.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Вивчіть фігури продовження',
          text: 'Трикутник, прапор, вимпел і чашка з ручкою показують паузу в тренді, а вхід беруть після закріплення за межею з підтвердженням обсягом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Освойте патерн 1-2-3 для входу за великим капіталом',
          text: 'Патерн 1-2-3 на сильному рівні дає вхід у точці 3 з коротким стопом і найкращим співвідношенням ризику до прибутку.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Торгуйте контекст, а не малюнок',
          text: 'Гола фігура спрацьовує приблизно навпіл, тож вирішує рівень, хибний прокол та обсяг, а не форма, і завжди зі стопом.',
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
          name: 'Цінова фігура',
          description:
            'Повторювана форма на графіку ціни, за якою трейдери намагаються передбачити подальший рух, частина класичного технічного аналізу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Голова та плечі',
          description:
            'Розворотна фігура з трьох вершин із вищою центральною та лінією шиї під ними, пробій якої прийнято вважати сигналом розвороту тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Подвійна вершина',
          description:
            'Розворотний патерн на вершині висхідного тренду, де ціна двічі впирається приблизно в один рівень і вдруге не може його пробити.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трикутник',
          description:
            'Патерн консолідації між двома збіжними лініями, де амплітуда коливань і обсяг згасають перед виходом ціни імпульсом за одну з меж.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прапор',
          description:
            'Патерн продовження тренду, у якому після різкого імпульсу ціна входить у невеликий похилий коридор проти руху, а потім пробиває його в бік тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вимпел',
          description:
            'Патерн продовження тренду після імпульсу, чия консолідація має форму маленького збіжного трикутника, а не паралельного коридору, як у прапора.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Чашка з ручкою',
          description:
            'Бичачий патерн продовження тренду, у якому за плавною заокругленою корекцією йде короткий відкат-ручка, після чого ціна пробиває попередній максимум угору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Патерн 1-2-3',
          description:
            'Розворотна фігура з трьох точок, де точка 1 фіксує екстремум старого руху, точка 2 перший відкат, а точка 3 повторний відкат, що не оновлює точку 1.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
