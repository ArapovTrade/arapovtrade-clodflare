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
  selector: 'app-home-uk-blog-one',
  templateUrl: './home-uk-blog-one.component.html',
  styleUrl: './home-uk-blog-one.component.scss',
})
export class HomeUkBlogOneComponent implements OnInit {
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
      'Імбаланс і FVG (Fair Value Gap) | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке імбаланс і FVG (Fair Value Gap), як знаходити зони неефективності на графіку і чому ціна часто повертається їх закривати.',
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
            'Імбаланс і FVG у трейдингу: що це та як торгувати дисбаланс',
          description:
            'Що таке імбаланс і FVG (Fair Value Gap), як знаходити зони неефективності на графіку і чому ціна часто повертається їх закривати.',
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
            '@id': 'https://arapov.trade/uk/freestudying/imbalance-fvg',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/imbalanceandfvg.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Smart Money',
          keywords:
            "імбаланс, Fair Value Gap, FVG, дисбаланс, зона імбалансу, Smart Money, ордер-блок, об'ємний аналіз",
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
          name: 'Що таке імбаланс і FVG простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Імбаланс це зона, крізь яку ціна промчала надто швидко й лишила попит та пропозицію поза рівновагою. Fair Value Gap, або FVG, це видимий слід такого ходу у вигляді розриву між свічками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим FVG відрізняється від імбалансу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FVG це найвпізнаваніший окремий випадок імбалансу, розрив із трьох свічок. Імбаланс ширший: це будь-який перехід ринку з балансу в дисбаланс. Тому кожен FVG це імбаланс, та не кожен імбаланс оформлений як класичний FVG.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як знайти зону імбалансу на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Візьміть три свічки поспіль і подивіться на сильну середню. Якщо для бичачого випадку мінімум третьої свічки вищий за максимум першої, між ними лишається незаповнена зона, це і є розрив. Найнадійніше шукати такі зони на рівнях із накопиченням об'єму.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чи завжди ціна повертається в зону імбалансу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні. Різкий хід лишає по собі невиконані ордери, а ринок тяжіє до рівноваги, тому ціна часто відкочує в зону й добирає лишену ліквідність. Але це не закон: на старших таймфреймах і на новинах розрив цілком може лишитися відкритим надовго.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати по зонах імбалансу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Чекаєте повернення ціни до зони й заходите за напрямом основного руху, але лише після реакції ціни, наприклад пін-бара чи відбою, і на підсохлому об'ємі. Стоп ховають за дальню кромку розриву, ціль на наступному рівні.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим імбаланс відрізняється від ордер-блока?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ордер-блок це ділянка, звідки стартував імпульс і де великий капітал набирав позицію. Імбаланс це слід самого імпульсу. Найміцніше працює їхня зв'язка під підтвердженням об'єму.",
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
      '@id': 'https://arapov.trade/uk/freestudying/imbalance-fvg#howto',
      name: 'Як знаходити й торгувати імбаланс і FVG',
      description:
        'Покроковий розбір зони дисбалансу: від пошуку за трьома свічками до входу на поверненні ціни',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте природу імбалансу',
          text: 'Імбаланс це перекіс попиту й пропозиції, за якого ціна пролітає ділянку графіка, не давши частині ордерів виконатися.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть FVG за трьома свічками',
          text: 'Візьміть три свічки із сильною середньою: для бичачого розриву мінімум третьої свічки вищий за максимум першої, для ведмежого дзеркально.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся повернення в зону',
          text: 'Після імпульсу ціна часто відкочує до зони FVG, щоб добрати лишену ліквідність, і там шукають вхід за ходом руху.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Заходьте на реакції та об'ємі",
          text: "Наосліп у зону не заходять: чекають реакції ціни, пін-бара чи відбою, і підсохлого об'єму, а стоп ховають за дальню кромку розриву.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Підсильте зону ордер-блоком',
          text: "Найсильніші зони виходять там, де імбаланс лягає на ордер-блок і підтверджений об'ємом великого інтересу.",
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
          name: 'Імбаланс',
          description:
            'Перекіс між попитом і пропозицією, за якого ціна проходить ділянку графіка так швидко, що частина ордерів у цій зоні не встигає виконатися.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Найвпізнаваніший окремий випадок імбалансу: видимий розрив із трьох свічок, який ціна пройшла одним різким рухом.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
