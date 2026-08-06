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
  selector: 'app-home-uk-blog-thirty-two',
  templateUrl: './home-uk-blog-thirty-two.component.html',
  styleUrl: './home-uk-blog-thirty-two.component.scss',
})
export class HomeUkBlogThirtyTwoComponent implements OnInit {
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
    this.titleService.setTitle('Як працює біржа | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке біржа, які бувають види та функції, як влаштовані торги і чим біржовий ринок відрізняється від позабіржового. Гайд для новачка.',
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
            'Як працює біржа простими словами: ринок, ціна, стакан і кліринг',
          description:
            'Що таке біржа, які бувають види та функції, як влаштовані торги і чим біржовий ринок відрізняється від позабіржового. Гайд для новачка.',
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
            '@id': 'https://arapov.trade/uk/freestudying/how-exchange-works',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/how-exchange-works.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Біржа',
          keywords:
            'біржа, брокер, біржовий стакан, кліринг, формування ціни, акція, торгові сесії',
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
          name: 'Чим біржа відрізняється від брокера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Біржа це сам торговий майданчик, де зводяться угоди й формується ціна. Брокер це посередник, через якого приватний трейдер дістає до неї доступ. Тобто торгуєте ви на біржі, але через брокера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як формується ціна на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ціну визначає баланс попиту й пропозиції. Коли покупці активніші, ціна зростає; коли тиснуть продавці, падає. Поточна ціна це ціна останньої угоди, у якій зійшлися покупець і продавець, а не призначене кимось число.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке біржовий стакан?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це таблиця всіх поточних заявок на купівлю й продаж, карта попиту й пропозиції в реальному часі. Лімітні заявки стоять у стакані й чекають, а ринкові виконуються одразу й рухають ціну, проїдаючи ліквідність.',
          },
        },
        {
          '@type': 'Question',
          name: 'Навіщо потрібна клірингова палата?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вона стає між покупцем і продавцем і гарантує виконання угоди, знімаючи ризик, що друга сторона не розрахується. Завдяки клірингу на регульованій біржі на кшталт CME видно чесний обсяг, а угоди зводяться прозоро.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке акція простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це цінний папір, що дає власнику частку в компанії. Купивши акцію, ви стаєте співвласником бізнесу й дістаєте право на частину його прибутку та, як правило, голос на зборах акціонерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли краще торгувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найліквідніший час це перетин європейської й американської сесій, ближче до середини дня за Європою. Тоді в ринку максимум учасників. У моменти виходу важливих новин входити новачкові ризиковано через хаотичні рухи.',
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
      '@id': 'https://arapov.trade/uk/freestudying/how-exchange-works#howto',
      name: 'Як розібратися в устрої біржі',
      description:
        'Покроковий розбір того, як побудований біржовий ринок і як це застосовувати в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розрізняйте біржу й брокера',
          text: 'Біржа це централізований майданчик, де зводяться угоди, а брокер — посередник, через якого приватний трейдер дістає до неї доступ.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайте учасників: великий капітал і натовп',
          text: 'На біржі сходяться великий капітал (банки й фонди) і роздрібний натовп, а доступ та ліквідність дають брокер, маркетмейкер і клірингова палата; завдання — за обсягом бачити бік великого капіталу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Зрозумійте, що таке акція',
          text: 'Акція це базовий інструмент ринку, частка в компанії, ціну якої в моменті рухають попит і пропозиція, а не якість бізнесу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розберіться, які активи торгуються й де',
          text: "Через біржу торгують акції, облігації, ф'ючерси, сировину й валюту за єдиного устрою ринку, тож починайте з одного інструмента; частина ринку позабіржова, як Форекс, де єдиного чесного обсягу немає.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Розберіться, як народжується ціна',
          text: 'Біржова ціна це ціна останньої угоди, народжена балансом попиту й пропозиції; ринок часто падає не від продавців, а від вичерпаного попиту.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте стакан і типи заявок',
          text: 'Лімітна заявка стоїть у стакані й чекає, а ринкова виконується одразу й рухає ціну, проїдаючи ліквідність; за дисбалансом у стакані видно, хто сильніший.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Зрозумійте роль клірингу й обсягу',
          text: 'Кліринг знімає ризик неплатежу, тому обсяг на регульованій біржі чесний, і саме за ним видно сліди розумних грошей.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Обирайте час для торгівлі',
          text: 'Найліквідніший момент це перетин лондонської й американської сесій; торгувати менше, але в це вікно, краще, ніж весь день по тонкому ринку.',
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
          name: 'Біржа',
          description:
            'Централізований торговий майданчик, де за єдиними правилами зустрічаються покупці й продавці, а ціна формується відкрито через аукціон заявок у стакані.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Акція',
          description:
            'Цінний папір, що закріплює за власником частку в компанії та право на частину її прибутку й майна.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Біржова ціна',
          description:
            'Ціна останньої угоди, у якій зійшлися покупець і продавець; вона народжується з балансу попиту й пропозиції, а не призначається згори.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Клірингова палата',
          description:
            "Посередник, який стає між покупцем і продавцем і гарантує, що обидві сторони виконають зобов'язання за угодою.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інституційні інвестори',
          description:
            'Великий професійний учасник ринку, такий як банк чи фонд, з великим капіталом, аналітикою й дисципліною; на відміну від роздрібного натовпу здатний помітно впливати на ціну.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Позабіржовий ринок',
          description:
            'Угоди безпосередньо між учасниками без єдиного централізованого майданчика й спільного стакана; приклад — валютний ринок Форекс, де єдиного чесного обсягу по всьому ринку немає.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
