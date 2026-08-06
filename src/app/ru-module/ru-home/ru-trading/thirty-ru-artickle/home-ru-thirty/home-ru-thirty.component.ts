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
  selector: 'app-home-ru-thirty',
  templateUrl: './home-ru-thirty.component.html',
  styleUrl: './home-ru-thirty.component.scss',
})
export class HomeRuThirtyComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Imbalance и FVG: зоны ликвидности в трейдинге | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Imbalance и FVG в трейдинге: полное руководство по зонам ликвидности. Узнайте, как находить дисбалансы и Fair Value Gaps для точных входов в рынок.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/imbalanceandfvg.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          '@id': 'https://arapov.trade/ru/freestudying/imbalanceandfvg#article',
          headline: 'Imbalance и FVG: зоны ликвидности в трейдинге',
          description:
            'Полное руководство по концепциям Imbalance и Fair Value Gap. Узнайте, как находить дисбалансы и использовать их для точных входов в рынок.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/imbalanceandfvg1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/ru#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/imbalanceandfvg',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Imbalance',
            'FVG',
            'Fair Value Gap',
            'дисбаланс',
            'ликвидность',
          ],
          wordCount: 1450,
          inLanguage: 'ru',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalanceandfvg#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Imbalance в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Imbalance (дисбаланс) — это состояние рынка, когда спрос и предложение резко расходятся, вызывая стремительное движение цены в одном направлении без значительного сопротивления. Такие зоны указывают на активность крупных игроков.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Fair Value Gap (FVG)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap — это ценовой разрыв между свечами на графике, возникающий при быстром движении цены. FVG представляет зону, где рынок не успел сформировать сбалансированную ликвидность, и цена часто возвращается для заполнения этого разрыва.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить бычий и медвежий FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бычий FVG формируется между минимумом первой свечи и максимумом третьей при восходящем импульсе. Медвежий FVG образуется между максимумом первой свечи и минимумом третьей при нисходящем движении.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему цена возвращается к зонам FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рынок стремится к равновесию. Незаполненные зоны ликвидности действуют как магнит для цены. Smart Money используют эти разрывы для размещения ордеров, поэтому цена часто тестирует FVG перед продолжением движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах лучше искать FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее значимые FVG формируются на старших таймфреймах: H4, D1, W1. Разрывы на дневном графике имеют больший вес, чем на минутных интервалах, и чаще отрабатываются.',
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalanceandfvg#howto',
      name: 'Как торговать по зонам Imbalance и FVG',
      description:
        'Пошаговое руководство по использованию дисбалансов и Fair Value Gaps в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Найдите зону дисбаланса',
          text: 'Определите на графике области с импульсными свечами, где цена резко двигалась без откатов. Отметьте границы FVG между первой и третьей свечами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените значимость зоны',
          text: 'Проверьте, совпадает ли FVG с ключевыми уровнями поддержки или сопротивления. Используйте Volume Profile для подтверждения интереса крупных игроков.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь возврата цены',
          text: 'Не входите в рынок сразу. Ожидайте ретеста зоны FVG и появления подтверждающего сигнала: свечного паттерна или роста объёма.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Откройте позицию',
          text: 'При подтверждении входите в направлении первоначального импульса. Разместите стоп-лосс за границей FVG.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте сделкой',
          text: 'Установите тейк-профит на следующем уровне ликвидности. Переносите стоп в безубыток при движении цены в вашу сторону.',
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalanceandfvg#terms',
      name: 'Термины Imbalance и FVG',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Imbalance',
          description:
            'Дисбаланс между спросом и предложением, вызывающий резкое однонаправленное движение цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Ценовой разрыв между свечами, указывающий на зону незаполненной ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бычий FVG',
          description:
            'Разрыв справедливой стоимости при восходящем импульсе между минимумом первой и максимумом третьей свечи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежий FVG',
          description:
            'Разрыв справедливой стоимости при нисходящем движении между максимумом первой и минимумом третьей свечи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Объём доступных ордеров на покупку и продажу на определённых ценовых уровнях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возврат цены к ранее пройденному уровню для тестирования перед продолжением движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные институциональные участники рынка: банки, хедж-фонды, маркет-мейкеры.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Инструмент анализа, показывающий распределение объёма торгов по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульсная свеча',
          description:
            'Свеча с большим телом и малыми тенями, указывающая на сильное направленное движение.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Заполнение гэпа',
          description:
            'Возврат цены в зону ценового разрыва для восстановления рыночного равновесия.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
