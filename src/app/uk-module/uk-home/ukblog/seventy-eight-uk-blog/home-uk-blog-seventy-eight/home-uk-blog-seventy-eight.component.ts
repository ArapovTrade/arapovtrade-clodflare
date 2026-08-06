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
  selector: 'app-home-uk-blog-seventy-eight',
  templateUrl: './home-uk-blog-seventy-eight.component.html',
  styleUrl: './home-uk-blog-seventy-eight.component.scss',
})
export class HomeUkBlogSeventyEightComponent {
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
    this.titleService.setTitle('Що таке FOMO у трейдингу? | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'FOMO у трейдингу: що таке страх втраченої вигоди, як він впливає на торгівлю та методи його подолання. Психологія трейдера та контроль емоцій.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fomo.webp',
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
          headline: 'FOMO у трейдингу: як подолати страх втраченої вигоди',
          description:
            'FOMO у трейдингу: що таке страх втраченої вигоди та методи його подолання.',
          image: 'https://arapov.trade/assets/img/content/fomo.webp',
          datePublished: '2025-09-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },

          wordCount: 1320,
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
          name: 'Що таке FOMO у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO (Fear of Missing Out) — це страх втраченої вигоди, психологічний стан гострого занепокоєння при думці про пропущену можливість заробити на ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як FOMO впливає на торгові результати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO призводить до імпульсивних входів без аналізу, порушення торгового плану, збільшення ризиків та емоційного виснаження.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розпізнати FOMO у своїй торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ознаки FOMO: імпульсивні входи, роздратування після пропущених угод, постійний моніторинг графіків, збільшення обсягу позицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які методи допомагають подолати FOMO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ефективні методи: дотримання торгового плану, правило п'яти хвилин, обмеження соціальних мереж, фіксований ризик та ведення журналу.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому соціальні мережі посилюють FOMO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скріншоти чужих прибутків створюють ілюзію, що всі навколо багатіють, викликаючи бажання наздогнати потяг, що йде.',
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
      name: 'Як подолати FOMO у трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Усвідомте проблему',
          text: 'Чесно визнайте, що емоції впливають на ваші торгові рішення.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Створіть торговий план',
          text: 'Визначте чіткі критерії входу та виходу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: "Застосовуйте правило п'яти хвилин",
          text: "Почекайте п'ять хвилин перед входом у ринок.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Обмежте інформаційний потік',
          text: 'Скоротіть час у соціальних мережах.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведіть торговий журнал',
          text: 'Записуйте емоційний стан при кожній угоді.',
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
      name: 'Терміни: FOMO та психологія трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description: 'Fear of Missing Out — страх втраченої вигоди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульсивна торгівля',
          description:
            'Відкриття угод без попереднього аналізу під впливом емоцій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова дисципліна',
          description:
            'Здатність слідувати торговому плану незалежно від емоцій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description: 'Система управління ризиками для захисту капіталу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description: 'Набір правил для входу та виходу з угод',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тілт',
          description: 'Стан емоційного зриву у трейдингу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сетап',
          description: 'Набір умов для входу в угоду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description: 'Захисний ордер для обмеження збитків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Переторгівля',
          description: 'Надмірно часте відкриття угод',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
