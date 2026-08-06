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
  selector: 'app-home-ru-blog-seventy-five',
  templateUrl: './home-ru-blog-seventy-five.component.html',
  styleUrl: './home-ru-blog-seventy-five.component.scss',
})
export class HomeRuBlogSeventyFiveComponent {
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
      'Трейдинг: азартная игра или серьёзный бизнес? | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг — это азартная игра или бизнес? Разбираемся в психологии торговли, отличиях профессионального подхода от игрового мышления и способах достижения стабильной прибыли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
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
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Трейдинг: азартная игра или серьёзный бизнес?',
          description:
            'Анализ двух подходов к торговле на финансовых рынках. Как превратить трейдинг в стабильный источник дохода и избежать ловушек игрового мышления.',
          image:
            'https://arapov.trade/assets/img/content/gamblingorbusiness.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/gamblingorbusiness',
          },
          articleSection: 'Психология трейдинга',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чем трейдинг отличается от азартных игр?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В казино игрок не может повлиять на исход — результат определяется случайностью. В трейдинге можно управлять рисками, использовать аналитику и следовать стратегии. Профессиональный трейдинг основан на вероятностях и системном подходе, а не на удаче.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему большинство новичков торгуют как игроки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новички приходят на рынок с надеждой быстро разбогатеть. Они принимают решения на эмоциях, игнорируют риск-менеджмент, пытаются отыграться после убытков и не имеют чёткого торгового плана. Такой подход превращает торговлю в лотерею.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как превратить трейдинг в бизнес?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Необходимо разработать торговую стратегию, строго соблюдать риск-менеджмент, вести журнал сделок и контролировать эмоции. Профессиональный трейдер фокусируется на долгосрочном росте капитала, а не на быстрых спекулятивных заработках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие эмоции мешают трейдеру больше всего?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх и жадность — два главных врага трейдера. Страх заставляет закрывать прибыльные сделки рано или избегать входов. Жадность толкает к чрезмерным рискам и игнорированию стоп-лоссов. Контроль эмоций — основа стабильной торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое FOMO в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO (Fear Of Missing Out) — страх упустить возможность. Трейдер спешит войти в рынок, боясь пропустить прибыльное движение, и открывает необоснованные сделки без анализа. Это одна из главных психологических ловушек начинающих.',
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
      name: 'Как превратить трейдинг в прибыльный бизнес',
      description:
        'Пошаговое руководство по переходу от игрового мышления к профессиональному подходу в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разработайте торговую стратегию',
          text: 'Создайте чёткий план с правилами входа и выхода, критериями выбора активов и принципами управления капиталом.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Внедрите риск-менеджмент',
          text: 'Определите максимальный риск на сделку (1-2% от депозита), всегда используйте стоп-лоссы и рассчитывайте объём позиции.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведите торговый журнал',
          text: 'Записывайте каждую сделку с причинами входа, результатом и эмоциями. Анализируйте записи для выявления ошибок.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Контролируйте эмоции',
          text: 'Торгуйте по плану, не поддавайтесь страху и жадности. Делайте перерывы после серии убытков, практикуйте осознанность.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Фокусируйтесь на долгосрочном результате',
          text: 'Не гонитесь за быстрой прибылью. Стремитесь к стабильному росту капитала через последовательное применение стратегии.',
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
      name: 'Глоссарий: трейдинг как бизнес',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear Of Missing Out — страх упустить возможность, толкающий трейдера к необоснованным входам в рынок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Документ с правилами входа и выхода из сделок, критериями выбора активов и принципами управления рисками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления капиталом, определяющая максимальный риск на сделку и методы защиты депозита',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Эмоциональное состояние после убытков, приводящее к импульсивным решениям и отклонению от стратегии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисциплина',
          description:
            'Способность строго следовать торговому плану независимо от эмоций и рыночных искушений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Азартная торговля',
          description:
            'Подход к трейдингу, основанный на эмоциях и интуиции вместо анализа и стратегии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Системный подход',
          description:
            'Методика торговли, основанная на статистике, вероятностях и строгом следовании правилам',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Эмоциональный контроль',
          description:
            'Навык управления страхом, жадностью и другими эмоциями во время торговли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый журнал',
          description:
            'Записи всех сделок с анализом причин входа, результатов и эмоционального состояния',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Долгосрочное мышление',
          description:
            'Ориентация на стабильный рост капитала вместо быстрых спекулятивных заработков',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
