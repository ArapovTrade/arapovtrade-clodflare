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
  selector: 'app-home-uk-blog-fifty-three',
  templateUrl: './home-uk-blog-fifty-three.component.html',
  styleUrl: './home-uk-blog-fifty-three.component.scss',
})
export class HomeUkBlogFiftyThreeComponent implements OnInit {
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
      'Як читати графік: основи технічного аналізу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як читати ціновий графік: типи графіків, таймфрейми, тренди, рівні підтримки та опору. База технічного аналізу для новачка.',
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
            'Як читати графік: технічний аналіз, рівні, таймфрейми та канали',
          description:
            'Як читати ціновий графік: типи графіків, таймфрейми, тренди, рівні підтримки та опору. База технічного аналізу для новачка.',
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
            '@id': 'https://arapov.trade/uk/freestudying/chart-reading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/chart-reading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'читання графіка, технічний аналіз, види графіків, японські свічки, таймфрейми, рівні підтримки та опору, торгові канали',
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
          name: 'Що таке технічний аналіз простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Це читання графіка ціни та об'ємів, щоб зрозуміти, де актив дешевий, а де дорогий, і знайти точку входу. Він відповідає не на питання, чому ціна рухається, а на питання, де вона дешева і де дорога, виходячи з того, що вся доступна інформація вже відображена в ціні.",
          },
        },
        {
          '@type': 'Question',
          name: 'Який вид графіка кращий для початківця?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Як правило, свічковий. Він віддає всю ціну за період і схоплюється швидше за інші завдяки кольоровому тілу: з одного погляду ясно, вгору пішла ціна чи вниз. Лінійний зручний для загальної картини, барний потребує навички, тому свічка це комфортна золота середина.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який таймфрейм обрати новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Старші, годину і день. На них тихіший шум і рідші хибні сигнали, просторіше для аналізу, а спред з комісіями відкушують меншу частку. І ще плюс: такий графік не приковує до екрана, його спокійно тягнуть паралельно з роботою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як правильно будувати рівні підтримки та опору?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Малюйте рівень зоною, а не ідеальною рискою по самому піку. Спирайтеся на кілька торкань: що частіше ціна відгукувалася на ділянку, то вона міцніша. І звіряйтеся з об'ємом, адже вагома зона це та, через яку проходили великі обороти.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити справжній пробій рівня від хибного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "За об'ємом. Справжній пробій іде на зрослому об'ємі й закріплюється за рівнем, а хибний накол зазвичай млявий: ціна вискакує за рівень, збирає стопи й одразу повертається. Тому розумніше дочекатися закріплення й ретесту, а не влітати в прокол одразу.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чи працюють фігури технічного аналізу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Як готові сигнали, за моїм досвідом, вони працюють приблизно наполовину: їх роздивляються всі, і великі гроші знімають на них ліквідність. Перевага з'являється, коли граєш від зон і завіряєш вхід об'ємом, а не гадаєш за малюнком на графіку.",
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
      '@id': 'https://arapov.trade/uk/freestudying/chart-reading#howto',
      name: 'Як навчитися читати графік ціни',
      description:
        "Покроковий шлях: від виду графіка й таймфрейму до рівнів, каналів і перевірки входу об'ємом",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що читає технічний аналіз',
          text: "Технічний аналіз читає поведінку ціни й об'ємів і відповідає, де актив дешевий, а де дорогий, а найоб'єктивніше на графіку це рівні.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть вид графіка',
          text: 'Лінійний показує лише закриття, а бар і свічка несуть повні дані про ціну, тому всерйоз працюють зі свічками.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Підберіть таймфрейм під стиль',
          text: 'Що молодший таймфрейм, то більше шуму, тому новачку спокійніше починати зі старших періодів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Працюйте згори вниз по таймфреймах',
          text: 'Старший таймфрейм задає напрям, а молодший потрібен лише для точного входу в його бік.',
        },
        {
          '@type': 'HowToStep',
          name: 'Визначайте фазу ринку: тренд чи флет',
          text: 'Спершу зрозумійте, у якій фазі ринок: висхідний або низхідний тренд це дисбаланс, флет це баланс і цінова коробка накопичення або розподілу; у флеті працюйте від меж, у тренді тільки за трендом.',
          position: 5,
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Будуйте рівень як зону, а не лінію',
          text: "Рівень це діапазон по кількох торканнях, підтверджений об'ємом, а не точна риска по піку.",
        },
        {
          '@type': 'HowToStep',
          name: 'Читайте структуру руху: імпульс і відкат',
          text: "Тренд складається з імпульсів на підвищеному об'ємі та відкатів на зниженому; поки оновлюються максимуми й мінімуми, структура ціла, а пробій з ретестом рівня зміни пріоритету показує, що контроль над ринком змінився.",
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: "Входьте за реакцією й об'ємом, а не за фігурою",
          text: "Фігури дають приблизно 50 на 50, тому вхід беруть від рівня з підтвердженням об'ємом, а не за малюнком.",
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
          name: 'Технічний аналіз',
          description:
            "Метод вивчення ринку за графіком ціни та об'ємами торгів, без огляду на новини та звітність, виходячи з того, що все відоме ринку вже ввібране котируванням.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий графік',
          description:
            'Візуальне представлення зміни ціни активу в часі; буває лінійним, барним і свічковим.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Часовий інтервал, який вміщає одна свічка або бар, приміром на годиннику одна свічка вкладає в себе рівно годину торгів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки та опору',
          description:
            'Цінова зона, біля якої рух ціни раніше вже зупинявся або розвертався: підтримка знизу, опір зверху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий канал',
          description:
            'Цінова зона між двома паралельними трендовими лініями, усередині якої коливається ціна: верхня лінія динамічний опір, нижня динамічна підтримка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза ринку',
          description:
            'Поточний режим руху ціни: висхідний тренд, низхідний тренд або флет; флет це баланс і цінова коробка накопичення або розподілу, а тренд це дисбаланс і вихід ціни з коробки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень зміни пріоритету',
          description:
            "Ціна, пробій і утримання якої показують, що контроль над ринком перейшов від продавців до покупців або навпаки; зміна найнадійніше читається за зв'язкою пробій плюс ретест.",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
