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
  selector: 'app-home-uk-blog-eighty',
  templateUrl: './home-uk-blog-eighty.component.html',
  styleUrl: './home-uk-blog-eighty.component.scss',
})
export class HomeUkBlogEightyComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
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
    this.titleService.setTitle(
      'Патерн Голова та плечі: повний посібник | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як торгувати патерн Голова та плечі. Класична та перевернута фігура, точки входу, стоп-лосс, тейк-профіт та реальні приклади.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/headandshoulders.png',
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
          headline: 'Патерн Голова та плечі: повний посібник з торгівлі',
          description:
            'Детальний посібник з патерну Голова та плечі. Класична та перевернута фігура, сигнали входу, встановлення стоп-лосса та тейк-профіту, комбінування з індикаторами.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/headandshoulders',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/headandshoulders1.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords: 'голова та плечі, патерн розвороту, лінія шиї, трейдинг',
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
          name: 'Що таке патерн Голова та плечі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Голова та плечі — це розворотна фігура технічного аналізу, що формується на вершині висхідного тренду. Складається з трьох вершин: ліве плече, голова (найвища точка) та праве плече. Пробій лінії шиї сигналізує про розворот тренду вниз.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити лінію шиї?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Лінія шиї — це рівень підтримки, що з'єднує мінімуми між лівим плечем та головою, а також між головою та правим плечем. Вона може бути горизонтальною або похилою. Пробій цієї лінії є головним сигналом на вхід в угоду.",
          },
        },
        {
          '@type': 'Question',
          name: 'Де встановлювати стоп-лосс при торгівлі патерном?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс встановлюється вище правого плеча (консервативний підхід) або вище голови (широкий стоп). Також можна використовувати індикатор ATR для розрахунку адаптивного стопа з урахуванням поточної волатильності ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке перевернута Голова та плечі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевернута Голова та плечі — дзеркальний варіант патерну, що формується на дні низхідного тренду. Складається з трьох западин: ліве плече, голова (найнижча точка) та праве плече. Пробій лінії шиї вгору сигналізує про розворот до зростання.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати ціль по прибутку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ціль по прибутку розраховується за правилом симетрії: виміряйте відстань від голови до лінії шиї та відкладіть її від точки пробою в напрямку угоди. Ця відстань є мінімальною ціллю руху ціни після пробою.',
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
      name: 'Як торгувати патерн Голова та плечі',
      description:
        'Покроковий посібник з торгівлі розворотною фігурою Голова та плечі на фінансових ринках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікуйте патерн на графіку',
          text: 'Знайдіть три послідовні вершини після висхідного тренду: ліве плече, голова (найвища точка) та праве плече (нижче голови). Проведіть лінію шиї через мінімуми між вершинами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дочекайтеся пробою лінії шиї',
          text: 'Не входьте в угоду передчасно. Дочекайтеся закриття свічки нижче лінії шиї з підтвердженням зростання торгових обсягів. Це головний сигнал на відкриття короткої позиції.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Підтвердіть сигнал додатковими індикаторами',
          text: 'Перевірте дивергенцію на RSI або MACD, оцініть обсяги при пробої. Якщо лінія шиї збігається з горизонтальним рівнем підтримки, сигнал посилюється.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Встановіть стоп-лосс',
          text: 'Розмістіть стоп-лосс вище правого плеча або використовуйте ATR для розрахунку адаптивного стопа. Занадто вузький стоп може призвести до передчасного закриття позиції.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Визначте ціль по прибутку',
          text: 'Виміряйте висоту від голови до лінії шиї та відкладіть цю відстань вниз від точки пробою. Розгляньте часткове закриття позиції на 50% цільового руху.',
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
      name: 'Глосарій термінів патерну Голова та плечі',
      description:
        "Основні терміни та визначення, пов'язані з розворотним патерном Голова та плечі",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Голова та плечі',
          description:
            'Розворотна фігура технічного аналізу, що складається з трьох вершин, сигналізуючи про зміну висхідного тренду на низхідний.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія шиї',
          description:
            "Рівень підтримки, що з'єднує мінімуми між вершинами патерну. Пробій лінії шиї є головним сигналом на вхід в угоду.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліве плече',
          description:
            'Перша вершина патерну, що формується після висхідного руху, за якою слідує корекція вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Голова',
          description:
            'Центральна та найвища вершина патерну, що відображає останній імпульс висхідного тренду перед розворотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Праве плече',
          description:
            'Третя вершина патерну, розташована нижче голови, що підтверджує послаблення покупців.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перевернута Голова та плечі',
          description:
            'Дзеркальний варіант патерну, що формується на дні низхідного тренду та сигналізує про розворот до зростання.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест лінії шиї',
          description:
            'Повернення ціни до лінії шиї після пробою для тестування її як нового рівня опору або підтримки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Ситуація, коли ціна пробиває лінію шиї, але потім повертається назад, не підтверджуючи розворот тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Висота фігури',
          description:
            'Відстань від вершини голови до лінії шиї, що використовується для розрахунку мінімальної цілі руху після пробою.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Обсяги при пробої',
          description:
            'Збільшення торгових обсягів під час пробою лінії шиї, що підтверджує силу сигналу та участь великих гравців.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
