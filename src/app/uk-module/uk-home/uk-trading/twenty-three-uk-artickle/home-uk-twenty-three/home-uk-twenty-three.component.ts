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
  selector: 'app-home-uk-twenty-three',
  templateUrl: './home-uk-twenty-three.component.html',
  styleUrl: './home-uk-twenty-three.component.scss',
})
export class HomeUkTwentyThreeComponent implements OnInit {
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
      'Світові фондові індекси: повний огляд | ArapovTrade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся про ключові світові фондові індекси: S&P 500, Dow Jones, NASDAQ, DAX, FTSE 100, Nikkei 225. Як вони працюють та впливають на ринки.',
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
          headline: 'Світові фондові індекси: повний огляд та вплив на ринки',
          description:
            'Детальний огляд ключових світових фондових індексів. Американські, європейські та азіатські індекси, їх структура, особливості та вплив на глобальні ринки.',
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
            '@id': 'https://arapov.trade/uk/freestudying/worldstockindicates',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/worldstockindicates.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Фондовий ринок',
          keywords:
            'фондові індекси, S&P 500, Dow Jones, NASDAQ, DAX, FTSE 100',
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
          name: 'Що таке фондовий індекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фондовий індекс — це середньозважений показник вартості акцій, що входять до його складу. Він відображає стан певної групи компаній або сектору економіки та дозволяє оцінювати загальну динаміку ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який індекс вважається головним індикатором економіки США?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "S&P 500 вважається найбільш об'єктивним індикатором економіки США, оскільки включає 500 найбільших корпорацій з усіх ключових секторів: технологій, охорони здоров'я, фінансів, споживчих товарів та інших галузей.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється Dow Jones від S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dow Jones включає лише 30 найбільших компаній і є ціновзваженим індексом. S&P 500 включає 500 компаній і зважується за ринковою капіталізацією, що робить його більш репрезентативним.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який індекс відображає технологічний сектор?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NASDAQ-100 фокусується на акціях високотехнологічних компаній, включаючи Apple, Amazon, Google, Microsoft, Tesla та інші інноваційні корпорації. Це основний індикатор технологічного сектору.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як фондові індекси впливають на ринки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фондові індекси слугують барометром економіки та впливають на настрої інвесторів. Зростання індексів приваблює капітал, падіння викликає відтік у захисні активи. Індекси також впливають на валютні курси та товарні ринки.',
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
      '@id': 'https://arapov.trade/uk/freestudying/worldstockindicates#howto',
      name: 'Як аналізувати світові фондові індекси',
      description:
        'Покроковий посібник з аналізу та використання глобальних фондових індексів у торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть структуру основних індексів',
          text: 'Ознайомтеся зі складом ключових індексів: S&P 500 (500 найбільших компаній США), Dow Jones (30 голубих фішок), NASDAQ (технологічний сектор), DAX (40 німецьких компаній), FTSE 100 (британські компанії), Nikkei 225 (японські компанії).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Зрозумійте методи зважування',
          text: 'Розрізняйте ринкову капіталізацію (S&P 500, DAX) та ціновозважування (Dow Jones). Різні методи по-різному відображають вплив окремих компаній на індекс.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Стежте за макроекономічними показниками',
          text: 'Аналізуйте ВВП, інфляцію, процентні ставки та зайнятість для кожного регіону. Ці фактори прямо впливають на рух регіональних індексів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проаналізуйте кореляції між індексами',
          text: 'Відстежуйте, як рухаються американські індекси під час відкриття азіатських та європейських ринків. Зазвичай вони рухаються в одному напрямку, але можуть розвиватися розбіжності.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Використовуйте індекси у торговій стратегії',
          text: 'Застосовуйте індекси як інструмент підтвердження тренду та оцінки загального ринкового настрою. Торгуйте окремі акції з урахуванням напрямку руху індексу.',
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
      name: 'Глосарій фондових індексів',
      description:
        "Основні терміни та визначення, пов'язані зі світовими фондовими індексами",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фондовий індекс',
          description:
            "Статистичний показник, що відображає зміну вартості групи цінних паперів, об'єднаних за певною ознакою.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'S&P 500',
          description:
            'Американський фондовий індекс, що включає 500 найбільших публічних компаній США, зважених за ринковою капіталізацією.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dow Jones Industrial Average',
          description:
            'Один з найстаріших американських індексів, що включає 30 найбільших промислових корпорацій США.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NASDAQ-100',
          description:
            'Індекс, що відстежує 100 найбільших нефінансових компаній, які торгуються на біржі NASDAQ, переважно технологічного сектору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DAX',
          description:
            'Німецький фондовий індекс, що включає 40 найбільших компаній Німеччини, які торгуються на Франкфуртській біржі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FTSE 100',
          description:
            'Британський фондовий індекс 100 найбільших компаній, що торгуються на Лондонській фондовій біржі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Nikkei 225',
          description:
            'Японський фондовий індекс, що включає 225 найбільших компаній, які торгуються на Токійській фондовій біржі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CAC 40',
          description:
            'Французький фондовий індекс 40 найбільших компаній за ринковою капіталізацією на біржі Euronext Paris.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ринкова капіталізація',
          description:
            'Загальна вартість усіх випущених акцій компанії, що розраховується як ціна акції помножена на кількість акцій в обігу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ціновзважений індекс',
          description:
            'Тип індексу, в якому вага компанії визначається ціною її акції, а не ринковою капіталізацією.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
