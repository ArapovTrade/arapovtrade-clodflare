import { Injectable } from '@angular/core';
export interface artickle {
  titleUkr: string;
  titleRus: string;
  titleEn: string;
  descrUkr: string;
  descrRus: string;
  descrEn: string;
  realTitleRus: string;
  realTitleUkr: string;
  realTitleEn: string;
  linkUkr: string;
  imgUkr: string;
  groupsUkr: string[];
  groupsRus: string[];
  groupsEng: string[];
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  groups = [
    'Об`ємний аналіз ринку',
    'Концепція Смарт Мані',
    'Трейдинг для початківців',
    'Психологія трейдингу',
    'Словник трейдера',
    'Технічний аналіз',
    'Фундаментальний аналіз',
    'Криптовалюта',
    'Приклади угод',
  ];
  groupsRus = [
    'Объемный анализ рынка',
    'Концепция Смарт Мани',
    'Трейдинг для начинающих',
    'Психология трейдинга',
    'Словарь трейдера',
    'Технический анализ',
    'Фундаментальный анализ',
    'Криптовалюта',
    'Примеры сделок',
  ];
  groupsEng = [
    'Market Volume Analysis',
    'Smart Money Concept',
    'Trading for Beginners',
    'Trading Psychology',
    'Trader`s Dictionary',
    'Technical Analysis',
    'Fundamental Analysis',
    'Cryptocurrency',
    'Trade Examples',
  ];

  selectedGroups: string[] = [];
  getArticleByLink(link: string) {
    return (
      this.ukrArtickles.find((article) => article.linkUkr === link) || null
    );
  }
  ukrainiansArticles() {
    if (this.selectedGroups.length === 0) {
      return this.ukrArtickles;
    }
    return this.ukrArtickles.filter((article) =>
      article.groupsUkr.some((group) => this.selectedGroups.includes(group)),
    );
  }
  russianssArticles() {
    if (this.selectedGroups.length === 0) {
      return this.ukrArtickles;
    }
    return this.ukrArtickles.filter((article) =>
      article.groupsRus.some((group) => this.selectedGroups.includes(group)),
    );
  }

  englishArticles() {
    if (this.selectedGroups.length === 0) {
      return this.ukrArtickles;
    }
    return this.ukrArtickles.filter((article) =>
      article.groupsEng.some((group) => this.selectedGroups.includes(group)),
    );
  }
  getUkrainianGroups() {
    return this.groups;
  }
  getRussianGroups() {
    return this.groupsRus;
  }
  getEnglishGroups() {
    return this.groupsEng;
  }
  getRandomUkArticles() {
    // const shuffled = [...this.ukrArtickles].sort(() => 0.5 - Math.random());
    // return shuffled.slice(0, 4);
     const targetLinks = [
      'chart-reading',
      'volume-analysis',
      'market-microstructure',
      'risk-management',
    ];
    return this.ukrArtickles.filter((article) =>
      targetLinks.includes(article.linkUkr),
    );
  }
  getRandomUkArticlesFive() {
    // const shuffled = [...this.ukrArtickles].sort(() => 0.5 - Math.random());
    // return shuffled.slice(0, 5);
    const targetLinks = [
      'chart-reading',
      'volume-analysis',
      'market-microstructure',
      'risk-management',
    ];
    return this.ukrArtickles.filter((article) =>
      targetLinks.includes(article.linkUkr),
    );
  }

  ukrArtickles: artickle[] = [
    {
      titleUkr: 'Трейдинг для початківців: з чого почати',
      linkUkr: 'trading-for-beginners',
      imgUkr: '/assets/img/content/tradingbasics.webp',
      titleRus: 'Трейдинг для начинающих: с чего начать',
      titleEn: 'Trading for Beginners: Where to Start',
      descrUkr:
        'Трейдинг для початківців з нуля: як влаштовані ринки, які потрібні навички, перші кроки та типові помилки новачків. Гайд від Arapov.trade.',
      descrEn:
        'Trading for beginners from scratch: how markets work, what skills you need, first steps and typical beginner mistakes. A guide from Arapov.trade.',
      descrRus:
        'Трейдинг для начинающих с нуля: как устроены рынки, какие нужны навыки, первые шаги и типичные ошибки новичков. Гайд от Arapov.trade.',
      realTitleRus: 'Трейдинг для начинающих: с чего начать | Arapov.trade',
      realTitleUkr: 'Трейдинг для початківців: з чого почати | Arapov.trade',
      realTitleEn: 'Trading for Beginners: Where to Start | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 1,
    },
    {
      titleUkr: 'Торгові платформи та брокер: як обрати',
      linkUkr: 'platforms-broker',
      imgUkr: '/assets/img/content/platforms-broker.jpeg',
      titleRus: 'Торговые платформы и брокер: как выбрать',
      titleEn: 'Trading Platforms and Broker: How to Choose',
      descrUkr:
        'Як обрати брокера і торгову платформу: регуляція, комісії, виконання ордерів і на що дивитися новачку, щоб не натрапити на кухню.',
      descrEn:
        'How to choose a broker and trading platform: regulation, fees, order execution and what a beginner should check to avoid a dealing-desk scam.',
      descrRus:
        'Как выбрать брокера и торговую платформу: регуляция, комиссии, исполнение ордеров и на что смотреть новичку, чтобы не попасть на кухню.',
      realTitleRus: 'Торговые платформы и брокер: как выбрать | Arapov.trade',
      realTitleUkr: 'Торгові платформи та брокер: як обрати | Arapov.trade',
      realTitleEn: 'Trading Platforms and Broker: How to Choose | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 2,
    },
    {
      titleUkr: 'Проп-трейдинг: що це і як пройти челендж',
      linkUkr: 'prop-trading',
      imgUkr: '/assets/img/content/prop-trading.jpeg',
      titleRus: 'Проп-трейдинг: что это и как пройти челлендж',
      titleEn: 'Prop Trading: What It Is and How to Pass a Challenge',
      descrUkr:
        'Що таке проп-трейдинг, як влаштований челендж проп-фірми, її правила, виплати та підводні камені торгівлі на чужому капіталі.',
      descrEn:
        'What prop trading is, how a prop firm challenge works, its rules, payouts and the hidden catches of trading on someone else’s capital.',
      descrRus:
        'Что такое проп-трейдинг, как устроен челлендж проп-фирмы, её правила, выплаты и подводные камни торговли на чужом капитале.',
      realTitleRus:
        'Проп-трейдинг: что это и как пройти челлендж | Arapov.trade',
      realTitleUkr: 'Проп-трейдинг: що це і як пройти челендж | Arapov.trade',
      realTitleEn:
        'Prop Trading: What It Is and How to Pass a Challenge | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 3,
    },
    {
      titleUkr: 'Управління ризиками в трейдингу',
      linkUkr: 'risk-management',
      imgUkr: '/assets/img/content/capitalmanagement.webp',
      titleRus: 'Управление рисками в трейдинге',
      titleEn: 'Risk Management in Trading',
      descrUkr:
        'Управління ризиками і капіталом: розмір позиції, ризик на угоду, стоп-лосс і чому саме ризик-менеджмент зберігає депозит на дистанції.',
      descrEn:
        'Risk and capital management: position size, risk per trade, stop-loss and why risk management is what keeps your deposit alive over time.',
      descrRus:
        'Управление рисками и капиталом: размер позиции, риск на сделку, стоп-лосс и почему именно риск-менеджмент сохраняет депозит на дистанции.',
      realTitleRus: 'Управление рисками в трейдинге | Arapov.trade',
      realTitleUkr: 'Управління ризиками в трейдингу | Arapov.trade',
      realTitleEn: 'Risk Management in Trading | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 4,
    },
    {
      titleUkr: 'Стилі трейдингу: скальпінг, дейтрейдинг, свінг',
      linkUkr: 'trading-styles',
      imgUkr: '/assets/img/content/trading-styles.jpeg',
      titleRus: 'Стили трейдинга: скальпинг, дейтрейдинг, свинг',
      titleEn: 'Trading Styles: Scalping, Day Trading, Swing',
      descrUkr:
        'Стилі трейдингу простими словами: скальпінг, внутрішньоденна, свінг і позиційна торгівля. Чим відрізняються і кому який стиль підходить.',
      descrEn:
        'Trading styles in simple terms: scalping, intraday, swing and position trading. How they differ and which style suits whom.',
      descrRus:
        'Стили трейдинга простыми словами: скальпинг, внутридневная, свинг и позиционная торговля. Чем отличаются и кому какой стиль подходит.',
      realTitleRus:
        'Стили трейдинга: скальпинг, дейтрейдинг, свинг | Arapov.trade',
      realTitleUkr:
        'Стилі трейдингу: скальпінг, дейтрейдинг, свінг | Arapov.trade',
      realTitleEn:
        'Trading Styles: Scalping, Day Trading, Swing | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 5,
    },
    {
      titleUkr: 'Торгова система: як побудувати та оптимізувати',
      linkUkr: 'trading-system',
      imgUkr: '/assets/img/content/tradingsystem.webp',
      titleRus: 'Торговая система: как построить и оптимизировать',
      titleEn: 'Trading System: How to Build and Optimize',
      descrUkr:
        'Що таке торгова система, з чого вона складається, як її зібрати, протестувати та оптимізувати, не підганяючи під історію.',
      descrEn:
        'What a trading system is, what it consists of, how to build, test and optimize it without curve-fitting it to past data.',
      descrRus:
        'Что такое торговая система, из чего она состоит, как её собрать, протестировать и оптимизировать, не подгоняя под историю.',
      realTitleRus:
        'Торговая система: как построить и оптимизировать | Arapov.trade',
      realTitleUkr:
        'Торгова система: як побудувати та оптимізувати | Arapov.trade',
      realTitleEn: 'Trading System: How to Build and Optimize | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 6,
    },
    {
      titleUkr: 'Управління угодою: вхід, супровід, вихід',
      linkUkr: 'trade-management',
      imgUkr: '/assets/img/content/trade-management.jpeg',
      titleRus: 'Управление сделкой: вход, сопровождение, выход',
      titleEn: 'Trade Management: Entry, Handling, Exit',
      descrUkr:
        'Як керувати угодою після входу: перенесення в беззбиток, часткова фіксація, трейлінг-стоп і дисципліна виходу за планом, а не за емоціями.',
      descrEn:
        'How to manage a trade after entry: moving to breakeven, partial closing, trailing stop and the discipline of exiting by plan, not emotion.',
      descrRus:
        'Как управлять сделкой после входа: перенос в безубыток, частичная фиксация, трейлинг-стоп и дисциплина выхода по плану, а не по эмоциям.',
      realTitleRus:
        'Управление сделкой: вход, сопровождение, выход | Arapov.trade',
      realTitleUkr: 'Управління угодою: вхід, супровід, вихід | Arapov.trade',
      realTitleEn: 'Trade Management: Entry, Handling, Exit | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 7,
    },
    {
      titleUkr: 'Копітрейдинг: що це і як працює',
      linkUkr: 'copy-trading',
      imgUkr: '/assets/img/content/copytrading_two.png',
      titleRus: 'Копитрейдинг: что это и как работает',
      titleEn: 'Copy Trading: What It Is and How It Works',
      descrUkr:
        'Що таке копітрейдинг, як копіювати угоди успішних трейдерів, у чому плюси, ризики і чому сліпе копіювання часто веде до втрат.',
      descrEn:
        'What copy trading is, how to copy the trades of successful traders, the pros, the risks and why blind copying often leads to losses.',
      descrRus:
        'Что такое копитрейдинг, как копировать сделки успешных трейдеров, в чём плюсы, риски и почему слепое копирование часто приводит к потерям.',
      realTitleRus: 'Копитрейдинг: что это и как работает | Arapov.trade',
      realTitleUkr: 'Копітрейдинг: що це і як працює | Arapov.trade',
      realTitleEn: 'Copy Trading: What It Is and How It Works | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 8,
    },
    // {
    //   titleUkr: 'Стартовий депозит трейдера: скільки потрібно',
    //   linkUkr: 'starting-deposit',
    //   imgUkr: '/assets/img/content/starterdeposit.webp',
    //   titleRus: 'Стартовый депозит трейдера: сколько нужно',
    //   titleEn: 'Trader’s Starting Deposit: How Much You Need',
    //   descrUkr:
    //     'Скільки грошей потрібно для старту в трейдингу, як розрахувати стартовий депозит і чому надто малий рахунок заважає дотримуватися ризик-менеджменту.',
    //   descrEn:
    //     'How much money you need to start trading, how to calculate a starting deposit and why too small an account makes risk management impossible.',
    //   descrRus:
    //     'Сколько денег нужно для старта в трейдинге, как рассчитать стартовый депозит и почему слишком маленький счёт мешает соблюдать риск-менеджмент.',
    //   realTitleRus: 'Стартовый депозит трейдера: сколько нужно | Arapov.trade',
    //   realTitleUkr:
    //     'Стартовий депозит трейдера: скільки потрібно | Arapov.trade',
    //   realTitleEn:
    //     'Trader’s Starting Deposit: How Much You Need | Arapov.trade',
    //   groupsRus: ['Трейдинг для начинающих'],
    //   groupsUkr: ['Трейдинг для початківців'],
    //   groupsEng: ['Trading for Beginners'],
    //   id: 9,
    // },
    {
      titleUkr: 'Як читати графік: основи технічного аналізу',
      linkUkr: 'chart-reading',
      imgUkr: '/assets/img/content/chart-reading.jpeg',
      titleRus: 'Как читать график: основы технического анализа',
      titleEn: 'How to Read a Chart: Technical Analysis Basics',
      descrUkr:
        'Як читати ціновий графік: типи графіків, таймфрейми, тренди, рівні підтримки та опору. База технічного аналізу для новачка.',
      descrEn:
        'How to read a price chart: chart types, timeframes, trends, support and resistance levels. The technical analysis basics for a beginner.',
      descrRus:
        'Как читать ценовой график: типы графиков, таймфреймы, тренды, уровни поддержки и сопротивления. База технического анализа для новичка.',
      realTitleRus:
        'Как читать график: основы технического анализа | Arapov.trade',
      realTitleUkr:
        'Як читати графік: основи технічного аналізу | Arapov.trade',
      realTitleEn:
        'How to Read a Chart: Technical Analysis Basics | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 10,
    },
    {
      titleUkr: 'Графічні патерни в трейдингу',
      linkUkr: 'chart-patterns',
      imgUkr: '/assets/img/content/keypraicepattern.webp',
      titleRus: 'Графические паттерны в трейдинге',
      titleEn: 'Chart Patterns in Trading',
      descrUkr:
        'Графічні патерни технічного аналізу: трикутники, прапори, голова і плечі, подвійна вершина. Як їх знаходити і торгувати пробої.',
      descrEn:
        'Chart patterns in technical analysis: triangles, flags, head and shoulders, double top. How to spot them and trade the breakouts.',
      descrRus:
        'Графические паттерны технического анализа: треугольники, флаги, голова и плечи, двойная вершина. Как их находить и торговать пробои.',
      realTitleRus: 'Графические паттерны в трейдинге | Arapov.trade',
      realTitleUkr: 'Графічні патерни в трейдингу | Arapov.trade',
      realTitleEn: 'Chart Patterns in Trading | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 11,
    },
    {
      titleUkr: 'Нейромережі та ШІ в трейдингу: що вміють',
      linkUkr: 'ai-in-trading',
      imgUkr: '/assets/img/content/ai-trading.jpeg',
      titleRus: 'Нейросети и ИИ в трейдинге: что умеют',
      titleEn: 'Neural Networks and AI in Trading: What They Can Do',
      descrUkr:
        'Що нейромережі реально вміють на ринку, а що їм не до снаги, чому ШІ не передбачає майбутнє і як використати його як інструмент, а не оракула.',
      descrEn:
        'What neural networks really can do on the market, what is beyond them, why AI does not predict the future and how to use it as a tool, not an oracle.',
      descrRus:
        'Что нейросети реально умеют на рынке, а что им не под силу, почему ИИ не предсказывает будущее и как использовать его как инструмент, а не оракула.',
      realTitleRus: 'Нейросети и ИИ в трейдинге: что умеют | Arapov.trade',
      realTitleUkr: 'Нейромережі та ШІ в трейдингу: що вміють | Arapov.trade',
      realTitleEn:
        'Neural Networks and AI in Trading: What They Can Do | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 12,
    },
    {
      titleUkr: 'Індикатори в трейдингу: види та застосування',
      linkUkr: 'trading-indicators',
      imgUkr: '/assets/img/content/trading-indicators.jpeg',
      titleRus: 'Индикаторы в трейдинге: виды и применение',
      titleEn: 'Indicators in Trading: Types and Use',
      descrUkr:
        'Індикатори в трейдингу: трендові, осцилятори та об’ємні. Як вони працюють, що показують і чому індикатор не сигнал сам по собі.',
      descrEn:
        'Indicators in trading: trend ones, oscillators and volume-based. How they work, what they show and why an indicator alone is not a signal.',
      descrRus:
        'Индикаторы в трейдинге: трендовые, осцилляторы и объёмные. Как они работают, что показывают и почему индикатор не сигнал сам по себе.',
      realTitleRus: 'Индикаторы в трейдинге: виды и применение | Arapov.trade',
      realTitleUkr:
        'Індикатори в трейдингу: види та застосування | Arapov.trade',
      realTitleEn: 'Indicators in Trading: Types and Use | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 13,
    },
    {
      titleUkr: 'Стратегія пробою рівня',
      linkUkr: 'breakout-strategy',
      imgUkr: '/assets/img/content/breakout-strategy.jpeg',
      titleRus: 'Стратегия пробоя уровня',
      titleEn: 'Level Breakout Strategy',
      descrUkr:
        'Як торгувати пробій рівня: визначення ключових зон, підтвердження обсягом, хибні пробої і де ставити стоп. Стратегія для новачків і профі.',
      descrEn:
        'How to trade a level breakout: spotting key zones, volume confirmation, false breakouts and where to place the stop. A strategy for all levels.',
      descrRus:
        'Как торговать пробой уровня: определение ключевых зон, подтверждение объёмом, ложные пробои и где ставить стоп. Стратегия для новичков и профи.',
      realTitleRus: 'Стратегия пробоя уровня | Arapov.trade',
      realTitleUkr: 'Стратегія пробою рівня | Arapov.trade',
      realTitleEn: 'Level Breakout Strategy | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 14,
    },
    {
      titleUkr: 'Свічкові патерни: як читати японські свічки',
      linkUkr: 'candlestick-patterns',
      imgUkr: '/assets/img/content/candlestick-patterns.png',
      titleRus: 'Свечные паттерны: как читать японские свечи',
      titleEn: 'Candlestick Patterns: How to Read Japanese Candles',
      descrUkr:
        'Японські свічки та свічкові патерни: молот, доджі, поглинання, вечірня зірка. Як читати сигнали розвороту і чому важливий рівень.',
      descrEn:
        'Japanese candles and candlestick patterns: hammer, doji, engulfing, evening star. How to read reversal signals and why the level matters.',
      descrRus:
        'Японские свечи и свечные паттерны: молот, доджи, поглощение, вечерняя звезда. Как читать сигналы разворота и почему важен уровень.',
      realTitleRus:
        'Свечные паттерны: как читать японские свечи | Arapov.trade',
      realTitleUkr:
        'Свічкові патерни: як читати японські свічки | Arapov.trade',
      realTitleEn:
        'Candlestick Patterns: How to Read Japanese Candles | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 15,
    },
    {
      titleUkr: 'Індикатор ADX: сила тренду',
      linkUkr: 'adx-indicator',
      imgUkr: '/assets/img/content/adx.jpeg',
      titleRus: 'Индикатор ADX: сила тренда',
      titleEn: 'ADX Indicator: Trend Strength',
      descrUkr:
        'Що показує індикатор ADX, як відрізнити сильний тренд від млявого боковика і чому він вимірює силу руху, але не його напрям.',
      descrEn:
        'What the ADX indicator shows, how to tell a strong trend from a sluggish range and why it measures the strength of a move, not its direction.',
      descrRus:
        'Что показывает индикатор ADX, как отличить сильный тренд от вялого боковика и почему он измеряет силу движения, но не его направление.',
      realTitleRus: 'Индикатор ADX: сила тренда | Arapov.trade',
      realTitleUkr: 'Індикатор ADX: сила тренду | Arapov.trade',
      realTitleEn: 'ADX Indicator: Trend Strength | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 16,
    },
    {
      titleUkr: 'Індикатор ATR: волатильність ринку',
      linkUkr: 'atr-indicator',
      imgUkr: '/assets/img/content/atrindicator.jpg',
      titleRus: 'Индикатор ATR: волатильность рынка',
      titleEn: 'ATR Indicator: Market Volatility',
      descrUkr:
        'Що таке індикатор ATR (Average True Range), як він вимірює волатильність і як використати його для розрахунку стопів та розміру позиції.',
      descrEn:
        'What the ATR (Average True Range) indicator is, how it measures volatility and how to use it to set stops and calculate position size.',
      descrRus:
        'Что такое индикатор ATR (Average True Range), как он измеряет волатильность и как использовать его для расчёта стопов и размера позиции.',
      realTitleRus: 'Индикатор ATR: волатильность рынка | Arapov.trade',
      realTitleUkr: 'Індикатор ATR: волатильність ринку | Arapov.trade',
      realTitleEn: 'ATR Indicator: Market Volatility | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 17,
    },
    {
      titleUkr: 'Індикатор MACD: сигнали та дивергенції',
      linkUkr: 'macd-indicator',
      imgUkr: '/assets/img/content/macdindicator.png',
      titleRus: 'Индикатор MACD: сигналы и дивергенции',
      titleEn: 'MACD Indicator: Signals and Divergences',
      descrUkr:
        'Індикатор MACD: налаштування, сигнальна лінія та гістограма, перетини та дивергенції. Як читати сигнали і не потрапляти на хибні.',
      descrEn:
        'The MACD indicator: settings, signal line and histogram, crossovers and divergences. How to read its signals and avoid false ones.',
      descrRus:
        'Индикатор MACD: настройки, сигнальная линия и гистограмма, пересечения и дивергенции. Как читать сигналы и не попадать на ложные.',
      realTitleRus: 'Индикатор MACD: сигналы и дивергенции | Arapov.trade',
      realTitleUkr: 'Індикатор MACD: сигнали та дивергенції | Arapov.trade',
      realTitleEn: 'MACD Indicator: Signals and Divergences | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 18,
    },
    {
      titleUkr: 'Індикатор RSI: перекупленість і перепроданість',
      linkUkr: 'rsi-indicator',
      imgUkr: '/assets/img/content/rsiindex1.png',
      titleRus: 'Индикатор RSI: перекупленность и перепроданность',
      titleEn: 'RSI Indicator: Overbought and Oversold',
      descrUkr:
        'Індикатор RSI: як читати перекупленість і перепроданість, дивергенції і чому сигнал RSI працює лише в контексті тренду.',
      descrEn:
        'The RSI indicator: how to read overbought and oversold, divergences and why an RSI signal works only in the context of the trend.',
      descrRus:
        'Индикатор RSI: как читать перекупленность и перепроданность, дивергенции и почему сигнал RSI работает только в контексте тренда.',
      realTitleRus:
        'Индикатор RSI: перекупленность и перепроданность | Arapov.trade',
      realTitleUkr:
        'Індикатор RSI: перекупленість і перепроданість | Arapov.trade',
      realTitleEn: 'RSI Indicator: Overbought and Oversold | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 19,
    },
    {
      titleUkr: 'Індикатор VWAP: середньозважена за обсягом',
      linkUkr: 'vwap-indicator',
      imgUkr: '/assets/img/content/vwap1.jpg',
      titleRus: 'Индикатор VWAP: средневзвешенная по объёму',
      titleEn: 'VWAP Indicator: Volume Weighted Average Price',
      descrUkr:
        'Що таке VWAP, як рахується середньозважена за обсягом ціна, навіщо її використовують інституціонали і як застосовувати у внутрішньоденній торгівлі.',
      descrEn:
        'What VWAP is, how the volume-weighted average price is calculated, why institutions use it and how to apply it in intraday trading.',
      descrRus:
        'Что такое VWAP, как считается средневзвешенная по объёму цена, зачем её используют институционалы и как применять во внутридневной торговле.',
      realTitleRus: 'Индикатор VWAP: средневзвешенная по объёму | Arapov.trade',
      realTitleUkr: 'Індикатор VWAP: середньозважена за обсягом | Arapov.trade',
      realTitleEn:
        'VWAP Indicator: Volume Weighted Average Price | Arapov.trade',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 20,
    },
    // {
    //   titleUkr: 'Тренди на ринку: види та аналіз',
    //   linkUkr: 'market-trends',
    //   imgUkr: '/assets/img/content/anatomyofmarkettrends.webp',
    //   titleRus: 'Тренды на рынке: виды и анализ',
    //   titleEn: 'Market Trends: Types and Analysis',
    //   descrUkr:
    //     'Що таке тренд, які бувають тренди, як визначити напрям і силу руху і чому торгівля за трендом простіша, ніж проти нього.',
    //   descrEn:
    //     'What a trend is, what types of trends exist, how to read direction and strength and why trading with the trend is easier than against it.',
    //   descrRus:
    //     'Что такое тренд, какие бывают тренды, как определить направление и силу движения и почему торговля по тренду проще, чем против него.',
    //   realTitleRus: 'Тренды на рынке: виды и анализ | Arapov.trade',
    //   realTitleUkr: 'Тренди на ринку: види та аналіз | Arapov.trade',
    //   realTitleEn: 'Market Trends: Types and Analysis | Arapov.trade',
    //   groupsRus: ['Технический анализ'],
    //   groupsUkr: ['Технічний аналіз'],
    //   groupsEng: ['Technical Analysis'],
    //   id: 21,
    // },
    {
      titleUkr: 'Хвилі Елліотта: основи та структура',
      linkUkr: 'elliott-waves',
      imgUkr: '/assets/img/content/wavesofelliott.webp',
      titleRus: 'Волны Эллиотта: основы и структура',
      titleEn: 'Elliott Waves: Basics and Structure',
      descrUkr:
        'Теорія хвиль Елліотта: імпульси та корекції, структура з п’яти і трьох хвиль, принципи розмітки та обмеження методу в реальній торгівлі.',
      descrEn:
        'Elliott Wave theory: impulses and corrections, the five- and three-wave structure, labeling principles and the method’s limits in real trading.',
      descrRus:
        'Теория волн Эллиотта: импульсы и коррекции, структура из пяти и трёх волн, принципы разметки и ограничения метода в реальной торговле.',
      realTitleRus: 'Волны Эллиотта: основы и структура | Arapov.trade',
      realTitleUkr: 'Хвилі Елліотта: основи та структура | Arapov.trade',
      realTitleEn: 'Elliott Waves: Basics and Structure | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 22,
    },
    {
      titleUkr: 'Індикатор Ішимоку: хмара Кумо',
      linkUkr: 'ichimoku-cloud',
      imgUkr: '/assets/img/content/ichimoku1.png',
      titleRus: 'Индикатор Ишимоку: облако Кумо',
      titleEn: 'Ichimoku Cloud Indicator: Kumo Cloud',
      descrUkr:
        'Індикатор Ішимоку: хмара Кумо, лінії Tenkan і Kijun, визначення тренду та сигналів. Як читати систему і не перевантажувати графік.',
      descrEn:
        'The Ichimoku indicator: the Kumo cloud, Tenkan and Kijun lines, reading trend and signals. How to use the system without cluttering the chart.',
      descrRus:
        'Индикатор Ишимоку: облако Кумо, линии Tenkan и Kijun, определение тренда и сигналов. Как читать систему и не перегружать график.',
      realTitleRus: 'Индикатор Ишимоку: облако Кумо | Arapov.trade',
      realTitleUkr: 'Індикатор Ішимоку: хмара Кумо | Arapov.trade',
      realTitleEn: 'Ichimoku Cloud Indicator: Kumo Cloud | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 23,
    },
    {
      titleUkr: 'Смуги Боллінджера',
      linkUkr: 'bollinger-bands',
      imgUkr: '/assets/img/content/bollingerbands1.jpg',
      titleRus: 'Полосы Боллинджера',
      titleEn: 'Bollinger Bands',
      descrUkr:
        'Смуги Боллінджера: налаштування, стиснення та розширення, пробої й відскоки від меж. Як індикатор показує волатильність і зони перегріву.',
      descrEn:
        'Bollinger Bands: settings, squeeze and expansion, breakouts and bounces off the bands. How the indicator shows volatility and overheated zones.',
      descrRus:
        'Полосы Боллинджера: настройки, сжатие и расширение, пробои и отскоки от границ. Как индикатор показывает волатильность и зоны перегрева.',
      realTitleRus: 'Полосы Боллинджера | Arapov.trade',
      realTitleUkr: 'Смуги Боллінджера | Arapov.trade',
      realTitleEn: 'Bollinger Bands | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 24,
    },
    {
      titleUkr: 'Ковзні середні в трейдингу',
      linkUkr: 'moving-averages',
      imgUkr: '/assets/img/content/movingaverages.webp',
      titleRus: 'Скользящие средние в трейдинге',
      titleEn: 'Moving Averages in Trading',
      descrUkr:
        'Ковзні середні: SMA та EMA, вибір періоду, перетини та використання як динамічної підтримки. Як застосовувати і де вони запізнюються.',
      descrEn:
        'Moving averages: SMA and EMA, choosing the period, crossovers and use as dynamic support. How to apply them and where they lag.',
      descrRus:
        'Скользящие средние: SMA и EMA, выбор периода, пересечения и использование как динамической поддержки. Как применять и где они запаздывают.',
      realTitleRus: 'Скользящие средние в трейдинге | Arapov.trade',
      realTitleUkr: 'Ковзні середні в трейдингу | Arapov.trade',
      realTitleEn: 'Moving Averages in Trading | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 25,
    },
    {
      titleUkr: 'Стохастичний осцилятор',
      linkUkr: 'stochastic-oscillator',
      imgUkr: '/assets/img/content/stochastic1.jpg',
      titleRus: 'Стохастический осциллятор',
      titleEn: 'Stochastic Oscillator',
      descrUkr:
        'Стохастичний осцилятор: налаштування, лінії %K і %D, сигнали перекупленості та перепроданості, дивергенції й поєднання з трендом.',
      descrEn:
        'The stochastic oscillator: settings, the %K and %D lines, overbought and oversold signals, divergences and combining it with the trend.',
      descrRus:
        'Стохастический осциллятор: настройки, линии %K и %D, сигналы перекупленности и перепроданности, дивергенции и комбинации с трендом.',
      realTitleRus: 'Стохастический осциллятор | Arapov.trade',
      realTitleUkr: 'Стохастичний осцилятор | Arapov.trade',
      realTitleEn: 'Stochastic Oscillator | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 26,
    },
    {
      titleUkr: 'Рівні Фібоначчі в технічному аналізі',
      linkUkr: 'fibonacci-levels',
      imgUkr: '/assets/img/content/fibonacci-levels.jpeg',
      titleRus: 'Уровни Фибоначчи в техническом анализе',
      titleEn: 'Fibonacci Levels in Technical Analysis',
      descrUkr:
        'Рівні Фібоначчі: як будувати сітку корекції, ключові рівні 0.382, 0.5, 0.618 і чому це орієнтир для зон інтересу, а не сигнал.',
      descrEn:
        'Fibonacci levels: how to draw the retracement grid, the key 0.382, 0.5, 0.618 levels and why they mark zones of interest, not a signal.',
      descrRus:
        'Уровни Фибоначчи: как строить сетку коррекции, ключевые уровни 0.382, 0.5, 0.618 и почему это ориентир для зон интереса, а не сигнал.',
      realTitleRus: 'Уровни Фибоначчи в техническом анализе | Arapov.trade',
      realTitleUkr: 'Рівні Фібоначчі в технічному аналізі | Arapov.trade',
      realTitleEn: 'Fibonacci Levels in Technical Analysis | Arapov.trade',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 27,
    },
    {
      titleUkr: 'Основи криптовалют для початківців',
      linkUkr: 'crypto-basics',
      imgUkr: '/assets/img/content/cryptocurrencybasics44.png',
      titleRus: 'Основы криптовалют для начинающих',
      titleEn: 'Cryptocurrency Basics for Beginners',
      descrUkr:
        'Основи криптовалют для початківців: що таке блокчейн, біткоїн і альткоїни, як працює ринок і з чого почати трейдинг крипти безпечно.',
      descrEn:
        'Cryptocurrency basics for beginners: what blockchain, bitcoin and altcoins are, how the market works and how to start crypto trading safely.',
      descrRus:
        'Основы криптовалют для начинающих: что такое блокчейн, биткоин и альткоины, как работает рынок и с чего начать трейдинг крипты безопасно.',
      realTitleRus: 'Основы криптовалют для начинающих | Arapov.trade',
      realTitleUkr: 'Основи криптовалют для початківців | Arapov.trade',
      realTitleEn: 'Cryptocurrency Basics for Beginners | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 28,
    },
    {
      titleUkr: 'Безстрокові ф’ючерси та маржинальна торгівля в крипті',
      linkUkr: 'crypto-perpetuals-margin',
      imgUkr: '/assets/img/content/crypto-perpetuals-margin.png',
      titleRus: 'Бессрочные фьючерсы и маржинальная торговля в крипте',
      titleEn: 'Crypto Perpetuals and Margin Trading',
      descrUkr:
        'Що таке безстрокові ф’ючерси, кредитне плече та маржинальна торгівля в крипті, до чого тут фандинг і чому велике плече веде до ліквідації.',
      descrEn:
        'What perpetual futures, leverage and margin trading in crypto are, why funding matters and why high leverage leads to liquidation.',
      descrRus:
        'Что такое бессрочные фьючерсы, кредитное плечо и маржинальная торговля в крипте, при чём тут фандинг и почему большое плечо ведёт к ликвидации.',
      realTitleRus:
        'Бессрочные фьючерсы и маржинальная торговля в крипте | Arapov.trade',
      realTitleUkr:
        'Безстрокові ф’ючерси та маржинальна торгівля в крипті | Arapov.trade',
      realTitleEn: 'Crypto Perpetuals and Margin Trading | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 29,
    },
    {
      titleUkr: 'Ризики та скам у криптовалюті: як захиститися',
      linkUkr: 'crypto-risks-scams',
      imgUkr: '/assets/img/content/cryptoscam.webp',
      titleRus: 'Риски и скам в криптовалюте: как защититься',
      titleEn: 'Crypto Risks and Scams: How to Stay Safe',
      descrUkr:
        'Головні ризики криптовалют і популярні схеми скаму: фейкові ICO, піраміди, фішинг і дрейн-гаманці. Як розпізнати обман і захистити кошти.',
      descrEn:
        'The main crypto risks and popular scam schemes: fake ICOs, pyramids, phishing and wallet drainers. How to spot fraud and protect your funds.',
      descrRus:
        'Главные риски криптовалют и популярные схемы скама: фейковые ICO, пирамиды, фишинг и дрейн-кошельки. Как распознать обман и защитить средства.',
      realTitleRus:
        'Риски и скам в криптовалюте: как защититься | Arapov.trade',
      realTitleUkr:
        'Ризики та скам у криптовалюті: як захиститися | Arapov.trade',
      realTitleEn: 'Crypto Risks and Scams: How to Stay Safe | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 30,
    },
    {
      titleUkr: 'Стейблкоїни та Tether (USDT)',
      linkUkr: 'stablecoins-tether',
      imgUkr: '/assets/img/content/stablecoins.webp',
      titleRus: 'Стейблкоины и Tether (USDT)',
      titleEn: 'Stablecoins and Tether (USDT)',
      descrUkr:
        'Що таке стейблкоїни, як вони тримають прив’язку до долара, чим USDT відрізняється від алгоритмічних монет і які у стейблкоїнів ризики.',
      descrEn:
        'What stablecoins are, how they hold the dollar peg, how USDT differs from algorithmic coins and what risks stablecoins carry.',
      descrRus:
        'Что такое стейблкоины, как они держат привязку к доллару, чем USDT отличается от алгоритмических монет и какие у стейблкоинов риски.',
      realTitleRus: 'Стейблкоины и Tether (USDT) | Arapov.trade',
      realTitleUkr: 'Стейблкоїни та Tether (USDT) | Arapov.trade',
      realTitleEn: 'Stablecoins and Tether (USDT) | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 31,
    },
    {
      titleUkr: 'Зберігання криптовалюти: гаманці та безпека',
      linkUkr: 'crypto-storage',
      imgUkr: '/assets/img/content/cryptostoring44.webp',
      titleRus: 'Хранение криптовалюты: кошельки и безопасность',
      titleEn: 'Cryptocurrency Storage: Wallets and Security',
      descrUkr:
        'Як безпечно зберігати криптовалюту: гарячі та холодні гаманці, сід-фраза, апаратні гаманці та правила захисту активів від крадіжки.',
      descrEn:
        'How to safely store cryptocurrency: hot and cold wallets, the seed phrase, hardware wallets and rules for protecting assets from theft.',
      descrRus:
        'Как безопасно хранить криптовалюту: горячие и холодные кошельки, сид-фраза, аппаратные кошельки и правила защиты активов от кражи.',
      realTitleRus:
        'Хранение криптовалюты: кошельки и безопасность | Arapov.trade',
      realTitleUkr:
        'Зберігання криптовалюти: гаманці та безпека | Arapov.trade',
      realTitleEn:
        'Cryptocurrency Storage: Wallets and Security | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 32,
    },
    {
      titleUkr: 'Біткоїн: що це і як працює',
      linkUkr: 'bitcoin-guide',
      imgUkr: '/assets/img/content/bitcoin.webp',
      titleRus: 'Биткоин: что это и как работает',
      titleEn: 'Bitcoin: What It Is and How It Works',
      descrUkr:
        'Що таке біткоїн, як працює блокчейн, майнінг та обмежена емісія, у чому цінність BTC і які ризики у першої криптовалюти.',
      descrEn:
        'What bitcoin is, how the blockchain, mining and limited supply work, where BTC’s value comes from and what risks the first cryptocurrency has.',
      descrRus:
        'Что такое биткоин, как работает блокчейн, майнинг и ограниченная эмиссия, в чём ценность BTC и какие риски у первой криптовалюты.',
      realTitleRus: 'Биткоин: что это и как работает | Arapov.trade',
      realTitleUkr: 'Біткоїн: що це і як працює | Arapov.trade',
      realTitleEn: 'Bitcoin: What It Is and How It Works | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 33,
    },
    {
      titleUkr: 'Bitcoin-ETF: що це і як впливає на ринок',
      linkUkr: 'bitcoin-etf',
      imgUkr: '/assets/img/content/bitcoinetf.webp',
      titleRus: 'Bitcoin-ETF: что это и как влияет на рынок',
      titleEn: 'Bitcoin ETF: What It Is and How It Affects the Market',
      descrUkr:
        'Що таке Bitcoin-ETF, як він працює, чим зручний інвесторам і як притоки у спотові ETF впливають на ринок криптовалют.',
      descrEn:
        'What a Bitcoin ETF is, how it works, why it suits investors and how inflows into spot ETFs affect the cryptocurrency market.',
      descrRus:
        'Что такое Bitcoin-ETF, как он работает, чем удобен инвесторам и как притоки в спотовые ETF влияют на рынок криптовалют.',
      realTitleRus: 'Bitcoin-ETF: что это и как влияет на рынок | Arapov.trade',
      realTitleUkr: 'Bitcoin-ETF: що це і як впливає на ринок | Arapov.trade',
      realTitleEn:
        'Bitcoin ETF: What It Is and How It Affects the Market | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 34,
    },
    {
      titleUkr: 'DeFi: децентралізовані фінанси',
      linkUkr: 'defi',
      imgUkr: '/assets/img/content/defi.jpeg',
      titleRus: 'DeFi: децентрализованные финансы',
      titleEn: 'DeFi: Decentralized Finance',
      descrUkr:
        'Що таке DeFi, як працюють обмін, кредити й стейкінг без банків на смартконтрактах і які ризики — від дір у коді до втрати коштів — тут реальні.',
      descrEn:
        'What DeFi is, how swaps, loans and staking work without banks on smart contracts and what risks, from code holes to lost funds, are real here.',
      descrRus:
        'Что такое DeFi, как работают обмен, кредиты и стейкинг без банков на смарт-контрактах и какие риски — от дыр в коде до потери средств — тут реальны.',
      realTitleRus: 'DeFi: децентрализованные финансы | Arapov.trade',
      realTitleUkr: 'DeFi: децентралізовані фінанси | Arapov.trade',
      realTitleEn: 'DeFi: Decentralized Finance | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 35,
    },
    {
      titleUkr: 'Ethereum: що це і як працює',
      linkUkr: 'ethereum-guide',
      imgUkr: '/assets/img/content/ethereum.webp',
      titleRus: 'Ethereum: что это и как работает',
      titleEn: 'Ethereum: What It Is and How It Works',
      descrUkr:
        'Що таке Ethereum, як працюють смартконтракти та dApps, чим ETH відрізняється від біткоїна і які перспективи у мережі.',
      descrEn:
        'What Ethereum is, how smart contracts and dApps work, how ETH differs from bitcoin and what prospects the network has.',
      descrRus:
        'Что такое Ethereum, как работают смарт-контракты и dApps, чем ETH отличается от биткоина и какие перспективы у сети.',
      realTitleRus: 'Ethereum: что это и как работает | Arapov.trade',
      realTitleUkr: 'Ethereum: що це і як працює | Arapov.trade',
      realTitleEn: 'Ethereum: What It Is and How It Works | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 36,
    },
    {
      titleUkr: 'Solana (SOL): гайд по криптовалюті',
      linkUkr: 'solana-guide',
      imgUkr: '/assets/img/content/sol1.jpg',
      titleRus: 'Solana (SOL): гайд по криптовалюте',
      titleEn: 'Solana (SOL): Cryptocurrency Guide',
      descrUkr:
        'Що таке Solana, як влаштований блокчейн SOL, його екосистема DeFi і NFT, переваги швидкості та ризики для трейдерів та інвесторів.',
      descrEn:
        'What Solana is, how the SOL blockchain works, its DeFi and NFT ecosystem, the speed advantages and the risks for traders and investors.',
      descrRus:
        'Что такое Solana, как устроен блокчейн SOL, его экосистема DeFi и NFT, преимущества скорости и риски для трейдеров и инвесторов.',
      realTitleRus: 'Solana (SOL): гайд по криптовалюте | Arapov.trade',
      realTitleUkr: 'Solana (SOL): гайд по криптовалюті | Arapov.trade',
      realTitleEn: 'Solana (SOL): Cryptocurrency Guide | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 37,
    },
    {
      titleUkr: 'XRP (Ripple): що це і як працює',
      linkUkr: 'xrp-ripple',
      imgUkr: '/assets/img/content/XRP2.jpg',
      titleRus: 'XRP (Ripple): что это и как работает',
      titleEn: 'XRP (Ripple): What It Is and How It Works',
      descrUkr:
        'Що таке XRP і мережа Ripple, як працюють транскордонні платежі, вплив судової справи SEC та ризики для трейдерів.',
      descrEn:
        'What XRP and the Ripple network are, how cross-border payments work, the impact of the SEC case and the risks for traders.',
      descrRus:
        'Что такое XRP и сеть Ripple, как работают трансграничные платежи, влияние судебного дела SEC и риски для трейдеров.',
      realTitleRus: 'XRP (Ripple): что это и как работает | Arapov.trade',
      realTitleUkr: 'XRP (Ripple): що це і як працює | Arapov.trade',
      realTitleEn: 'XRP (Ripple): What It Is and How It Works | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 38,
    },

    // {
    //   titleUkr: 'Аналіз ринку криптовалют',
    //   linkUkr: 'crypto-market-analysis',
    //   imgUkr: '/assets/img/content/cryptomarketanalysis.png',
    //   titleRus: 'Анализ рынка криптовалют',
    //   titleEn: 'Cryptocurrency Market Analysis',
    //   descrUkr:
    //     'Як аналізувати ринок криптовалют: попит і пропозиція, домінація, цикли та ончейн-дані. Підходи до аналізу для трейдерів та інвесторів.',
    //   descrEn:
    //     'How to analyze the crypto market: supply and demand, dominance, cycles and on-chain data. Analysis approaches for traders and investors.',
    //   descrRus:
    //     'Как анализировать рынок криптовалют: спрос и предложение, доминация, циклы и ончейн-данные. Подходы к анализу для трейдеров и инвесторов.',
    //   realTitleRus: 'Анализ рынка криптовалют | Arapov.trade',
    //   realTitleUkr: 'Аналіз ринку криптовалют | Arapov.trade',
    //   realTitleEn: 'Cryptocurrency Market Analysis | Arapov.trade',
    //   groupsRus: ['Криптовалюта'],
    //   groupsUkr: ['Криптовалюта'],
    //   groupsEng: ['Cryptocurrency'],
    //   id: 40,
    // },
    {
      titleUkr: 'Домінація біткоїна (BTC.D)',
      linkUkr: 'bitcoin-dominance',
      imgUkr: '/assets/img/content/bitcoin_dominance_1.png',
      titleRus: 'Доминация биткоина (BTC.D)',
      titleEn: 'Bitcoin Dominance (BTC.D)',
      descrUkr:
        'Що таке домінація біткоїна (BTC.D), навіщо стежити за цим показником і як домінування BTC впливає на ринок і альткоїни.',
      descrEn:
        'What Bitcoin dominance (BTC.D) is, why to track this metric and how BTC dominance affects the market and altcoins.',
      descrRus:
        'Что такое доминация биткоина (BTC.D), зачем следить за этим показателем и как доминирование BTC влияет на рынок и альткоины.',
      realTitleRus: 'Доминация биткоина (BTC.D) | Arapov.trade',
      realTitleUkr: 'Домінація біткоїна (BTC.D) | Arapov.trade',
      realTitleEn: 'Bitcoin Dominance (BTC.D) | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 41,
    },
    {
      titleUkr: 'Арбітраж криптовалют',
      linkUkr: 'crypto-arbitrage',
      imgUkr: '/assets/img/content/cryptoarbitrage.webp',
      titleRus: 'Арбитраж криптовалют',
      titleEn: 'Crypto Arbitrage',
      descrUkr:
        'Що таке арбітраж криптовалют, як заробляють на різниці цін між біржами, які види арбітражу бувають і де приховані ризики.',
      descrEn:
        'What crypto arbitrage is, how people earn on price differences between exchanges, what types of arbitrage exist and where the risks hide.',
      descrRus:
        'Что такое арбитраж криптовалют, как зарабатывают на разнице цен между биржами, какие виды арбитража бывают и где скрыты риски.',
      realTitleRus: 'Арбитраж криптовалют | Arapov.trade',
      realTitleUkr: 'Арбітраж криптовалют | Arapov.trade',
      realTitleEn: 'Crypto Arbitrage | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 42,
    },
    // {
    //   titleUkr: 'Маркет-мейкери на ринку криптовалют',
    //   linkUkr: 'crypto-market-makers',
    //   imgUkr: '/assets/img/content/cryptommakers.webp',
    //   titleRus: 'Маркет-мейкеры на рынке криптовалют',
    //   titleEn: 'Market Makers in the Crypto Market',
    //   descrUkr:
    //     'Хто такі маркет-мейкери в крипті, як вони забезпечують ліквідність і стабілізують ціну і як їхні дії впливають на ринок.',
    //   descrEn:
    //     'Who market makers are in crypto, how they provide liquidity and stabilize price and how their actions affect the market.',
    //   descrRus:
    //     'Кто такие маркет-мейкеры в крипте, как они обеспечивают ликвидность и стабилизируют цену и как их действия влияют на рынок.',
    //   realTitleRus: 'Маркет-мейкеры на рынке криптовалют | Arapov.trade',
    //   realTitleUkr: 'Маркет-мейкери на ринку криптовалют | Arapov.trade',
    //   realTitleEn: 'Market Makers in the Crypto Market | Arapov.trade',
    //   groupsRus: ['Криптовалюта'],
    //   groupsUkr: ['Криптовалюта'],
    //   groupsEng: ['Cryptocurrency'],
    //   id: 43,
    // },
    {
      titleUkr: 'Мемкоїни: що це і чому це казино',
      linkUkr: 'memecoins',
      imgUkr: '/assets/img/content/memecoins.jpeg',
      titleRus: 'Мемкоины: что это и почему это казино',
      titleEn: 'Memecoins: What They Are and Why It’s a Casino',
      descrUkr:
        'Що таке мемкоїни, на чому тримається їхня ціна, чому це чиста спекуляція на хайпі і як не лишитися зі знеціненим токеном на руках.',
      descrEn:
        'What memecoins are, what holds their price up, why it is pure speculation on hype and how not to be left holding a worthless token.',
      descrRus:
        'Что такое мемкоины, на чём держится их цена, почему это чистая спекуляция на хайпе и как не остаться с обесценившимся токеном на руках.',
      realTitleRus: 'Мемкоины: что это и почему это казино | Arapov.trade',
      realTitleUkr: 'Мемкоїни: що це і чому це казино | Arapov.trade',
      realTitleEn:
        'Memecoins: What They Are and Why It’s a Casino | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 44,
    },
    {
      titleUkr: 'Криптостейкінг: переваги та ризики',
      linkUkr: 'crypto-staking',
      imgUkr: '/assets/img/content/cryptostaking.webp',
      titleRus: 'Криптостейкинг: преимущества и риски',
      titleEn: 'Crypto Staking: Advantages and Risks',
      descrUkr:
        'Що таке стейкінг криптовалюти, як заробляти на блокуванні монет, яка дохідність реальна і які ризики у стейкінгу.',
      descrEn:
        'What cryptocurrency staking is, how to earn by locking coins, what yield is realistic and what risks staking carries.',
      descrRus:
        'Что такое стейкинг криптовалюты, как зарабатывать на блокировке монет, какая доходность реальна и какие риски у стейкинга.',
      realTitleRus: 'Криптостейкинг: преимущества и риски | Arapov.trade',
      realTitleUkr: 'Криптостейкінг: переваги та ризики | Arapov.trade',
      realTitleEn: 'Crypto Staking: Advantages and Risks | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 45,
    },
    {
      titleUkr: 'Токеноміка: як оцінити криптопроєкт',
      linkUkr: 'tokenomics',
      imgUkr: '/assets/img/content/tokenomics.jpeg',
      titleRus: 'Токеномика: как оценить криптопроект',
      titleEn: 'Tokenomics: How to Assess a Crypto Project',
      descrUkr:
        'Що таке токеноміка, як розподіл монет, емісія й розблокування впливають на ціну і чому за нею видно ризик обвалу ще до купівлі токена.',
      descrEn:
        'What tokenomics is, how coin distribution, issuance and unlocks affect price and why it reveals crash risk before you even buy a token.',
      descrRus:
        'Что такое токеномика, как распределение монет, эмиссия и разблокировки влияют на цену и почему по ней виден риск обвала ещё до покупки токена.',
      realTitleRus: 'Токеномика: как оценить криптопроект | Arapov.trade',
      realTitleUkr: 'Токеноміка: як оцінити криптопроєкт | Arapov.trade',
      realTitleEn: 'Tokenomics: How to Assess a Crypto Project | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 46,
    },
    {
      titleUkr: 'Халвінг біткоїна: що це',
      linkUkr: 'bitcoin-halving',
      imgUkr: '/assets/img/content/halving.webp',
      titleRus: 'Халвинг биткоина: что это',
      titleEn: 'Bitcoin Halving: What It Is',
      descrUkr:
        'Що таке халвінг біткоїна, коли він відбувається, як скорочення винагороди впливає на емісію і чому ця подія важлива для майнерів та інвесторів.',
      descrEn:
        'What Bitcoin halving is, when it happens, how the reward cut affects supply and why this event matters to miners and investors.',
      descrRus:
        'Что такое халвинг биткоина, когда он происходит, как сокращение награды влияет на эмиссию и почему это событие важно для майнеров и инвесторов.',
      realTitleRus: 'Халвинг биткоина: что это | Arapov.trade',
      realTitleUkr: 'Халвінг біткоїна: що це | Arapov.trade',
      realTitleEn: 'Bitcoin Halving: What It Is | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 47,
    },
    {
      titleUkr: 'Як працює біржа',
      linkUkr: 'how-exchange-works',
      imgUkr: '/assets/img/content/how-exchange-works.jpeg',
      titleRus: 'Как работает биржа',
      titleEn: 'How an Exchange Works',
      descrUkr:
        'Що таке біржа, які бувають види та функції, як влаштовані торги і чим біржовий ринок відрізняється від позабіржового. Гайд для новачка.',
      descrEn:
        'What an exchange is, its types and functions, how trading is organized and how the exchange market differs from OTC. A guide for beginners.',
      descrRus:
        'Что такое биржа, какие бывают виды и функции, как устроены торги и чем биржевой рынок отличается от внебиржевого. Гайд для новичка.',
      realTitleRus: 'Как работает биржа | Arapov.trade',
      realTitleUkr: 'Як працює біржа | Arapov.trade',
      realTitleEn: 'How an Exchange Works | Arapov.trade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 48,
    },
    {
      titleUkr: 'Мікроструктура ринку: стакан і стрічка',
      linkUkr: 'market-microstructure',
      imgUkr: '/assets/img/content/stockorderbook.png',
      titleRus: 'Микроструктура рынка: стакан и лента',
      titleEn: 'Market Microstructure: Order Book and Tape',
      descrUkr:
        'Як влаштована мікроструктура ринку: біржовий стакан, стрічка принтів, ліквідність та айсберг-ордери. Як читати потік заявок і угод.',
      descrEn:
        'How market microstructure works: the order book, the tape, liquidity and iceberg orders. How to read the flow of orders and trades.',
      descrRus:
        'Как устроена микроструктура рынка: биржевой стакан, лента принтов, ликвидность и айсберг-ордера. Как читать поток заявок и сделок.',
      realTitleRus: 'Микроструктура рынка: стакан и лента | Arapov.trade',
      realTitleUkr: 'Мікроструктура ринку: стакан і стрічка | Arapov.trade',
      realTitleEn: 'Market Microstructure: Order Book and Tape | Arapov.trade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 49,
    },
    {
      titleUkr: 'Види ордерів на біржі',
      linkUkr: 'order-types',
      imgUkr: '/assets/img/content/ordertypes.webp',
      titleRus: 'Виды ордеров на бирже',
      titleEn: 'Types of Orders on the Exchange',
      descrUkr:
        'Види ордерів на біржі: ринковий, лімітний, стоп і стоп-лімітний. Чим відрізняються, коли застосовувати і як вони виконуються.',
      descrEn:
        'Types of orders on the exchange: market, limit, stop and stop-limit. How they differ, when to use them and how they get filled.',
      descrRus:
        'Виды ордеров на бирже: рыночный, лимитный, стоп и стоп-лимитный. Чем отличаются, когда применять и как они исполняются.',
      realTitleRus: 'Виды ордеров на бирже | Arapov.trade',
      realTitleUkr: 'Види ордерів на біржі | Arapov.trade',
      realTitleEn: 'Types of Orders on the Exchange | Arapov.trade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 50,
    },
    {
      titleUkr: 'Ринок Forex: як працює та як торгувати',
      linkUkr: 'forex-guide',
      imgUkr: '/assets/img/content/ForexMarket.webp',
      titleRus: 'Рынок Forex: как работает и как торговать',
      titleEn: 'Forex Market: How It Works and How to Trade',
      descrUkr:
        'Що таке ринок Forex, хто його учасники, як влаштовані валютні пари та торгові сесії і з чого почати торгівлю валютою.',
      descrEn:
        'What the Forex market is, who its participants are, how currency pairs and trading sessions work and how to start trading currencies.',
      descrRus:
        'Что такое рынок Forex, кто его участники, как устроены валютные пары и торговые сессии и с чего начать торговлю валютой.',
      realTitleRus: 'Рынок Forex: как работает и как торговать | Arapov.trade',
      realTitleUkr: 'Ринок Forex: як працює та як торгувати | Arapov.trade',
      realTitleEn: 'Forex Market: How It Works and How to Trade | Arapov.trade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 51,
    },
    {
      titleUkr: 'Деривативи, ф’ючерси та спот',
      linkUkr: 'derivatives-futures-spot',
      imgUkr: '/assets/img/content/derivatives-futures-spot.jpeg',
      titleRus: 'Деривативы, фьючерсы и спот',
      titleEn: 'Derivatives, Futures and Spot',
      descrUkr:
        'Що таке деривативи, чим ф’ючерси та опціони відрізняються від споту, як працює плече і який інструмент обрати новачку.',
      descrEn:
        'What derivatives are, how futures and options differ from spot, how leverage works and which instrument a beginner should choose.',
      descrRus:
        'Что такое деривативы, чем фьючерсы и опционы отличаются от спота, как работает плечо и какой инструмент выбрать новичку.',
      realTitleRus: 'Деривативы, фьючерсы и спот | Arapov.trade',
      realTitleUkr: 'Деривативи, ф’ючерси та спот | Arapov.trade',
      realTitleEn: 'Derivatives, Futures and Spot | Arapov.trade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 52,
    },
    {
      titleUkr: 'Трейдер та інвестор: у чому різниця',
      linkUkr: 'trading-vs-investing',
      imgUkr: '/assets/img/content/tradingandinvestments.webp',
      titleRus: 'Трейдер и инвестор: в чём разница',
      titleEn: 'Trader vs Investor: What’s the Difference',
      descrUkr:
        'Чим трейдер відрізняється від інвестора, що краще — трейдинг чи інвестиції, у чому різниця в горизонті, ризиках і підході до ринку.',
      descrEn:
        'How a trader differs from an investor, what is better, trading or investing, and how they differ in horizon, risk and approach to the market.',
      descrRus:
        'Чем трейдер отличается от инвестора, что лучше — трейдинг или инвестиции, в чём разница в горизонте, рисках и подходе к рынку.',
      realTitleRus: 'Трейдер и инвестор: в чём разница | Arapov.trade',
      realTitleUkr: 'Трейдер та інвестор: у чому різниця | Arapov.trade',
      realTitleEn: 'Trader vs Investor: What’s the Difference | Arapov.trade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 53,
    },
    {
      titleUkr: 'Концепція Smart Money (SMC)',
      linkUkr: 'smart-money-guide',
      imgUkr: '/assets/img/content/smartmoneyconceptsguide.webp',
      titleRus: 'Концепция Smart Money (SMC)',
      titleEn: 'Smart Money Concept (SMC)',
      descrUkr:
        'Що таке Smart Money Concept: структура ринку, ліквідність, Order Blocks і FVG. Як торгують великі гравці і як читати їхні сліди.',
      descrEn:
        'What the Smart Money Concept is: market structure, liquidity, Order Blocks and FVG. How big players trade and how to read their footprints.',
      descrRus:
        'Что такое Smart Money Concept: структура рынка, ликвидность, Order Blocks и FVG. Как торгуют крупные игроки и как читать их следы.',
      realTitleRus: 'Концепция Smart Money (SMC) | Arapov.trade',
      realTitleUkr: 'Концепція Smart Money (SMC) | Arapov.trade',
      realTitleEn: 'Smart Money Concept (SMC) | Arapov.trade',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 54,
    },
    {
      titleUkr: 'Імбаланс і FVG (Fair Value Gap)',
      linkUkr: 'imbalance-fvg',
      imgUkr: '/assets/img/content/imbalanceandfvg.png',
      titleRus: 'Имбаланс и FVG (Fair Value Gap)',
      titleEn: 'Imbalance and FVG (Fair Value Gap)',
      descrUkr:
        'Що таке імбаланс і FVG (Fair Value Gap), як знаходити зони неефективності на графіку і чому ціна часто повертається їх закривати.',
      descrEn:
        'What imbalance and FVG (Fair Value Gap) are, how to find inefficiency zones on the chart and why price often returns to fill them.',
      descrRus:
        'Что такое имбаланс и FVG (Fair Value Gap), как находить зоны неэффективности на графике и почему цена часто возвращается их закрывать.',
      realTitleRus: 'Имбаланс и FVG (Fair Value Gap) | Arapov.trade',
      realTitleUkr: 'Імбаланс і FVG (Fair Value Gap) | Arapov.trade',
      realTitleEn: 'Imbalance and FVG (Fair Value Gap) | Arapov.trade',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 55,
    },
    {
      titleUkr: 'Ордер-блок (Order Block) у трейдингу',
      linkUkr: 'order-block',
      imgUkr: '/assets/img/content/orderblockintrading.webp',
      titleRus: 'Ордер-блок (Order Block) в трейдинге',
      titleEn: 'Order Block in Trading',
      descrUkr:
        'Що таке ордер-блок, як визначити зону, де набирав позицію великий гравець, які бувають види Order Block і як їх торгувати.',
      descrEn:
        'What an order block is, how to spot the zone where a big player built a position, what types of Order Block exist and how to trade them.',
      descrRus:
        'Что такое ордер-блок, как определить зону, где набирал позицию крупный игрок, какие бывают виды Order Block и как их торговать.',
      realTitleRus: 'Ордер-блок (Order Block) в трейдинге | Arapov.trade',
      realTitleUkr: 'Ордер-блок (Order Block) у трейдингу | Arapov.trade',
      realTitleEn: 'Order Block in Trading | Arapov.trade',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 56,
    },
    {
      titleUkr: 'Пули ліквідності: що це і як працюють',
      linkUkr: 'liquidity-pools',
      imgUkr: '/assets/img/content/liquiditypools.png',
      titleRus: 'Пулы ликвидности: что это и как работают',
      titleEn: 'Liquidity Pools: What They Are and How They Work',
      descrUkr:
        'Що таке пули ліквідності, як Smart Money знаходять ліквідність за рівнями і використовують приховані зони для маніпуляції ціною.',
      descrEn:
        'What liquidity pools are, how Smart Money finds liquidity beyond levels and uses hidden zones to manipulate price.',
      descrRus:
        'Что такое пулы ликвидности, как Smart Money находят ликвидность за уровнями и используют скрытые зоны для манипуляции ценой.',
      realTitleRus: 'Пулы ликвидности: что это и как работают | Arapov.trade',
      realTitleUkr: 'Пули ліквідності: що це і як працюють | Arapov.trade',
      realTitleEn:
        'Liquidity Pools: What They Are and How They Work | Arapov.trade',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 57,
    },
    {
      titleUkr: 'Фундаментальний аналіз ринку',
      linkUkr: 'fundamental-analysis',
      imgUkr: '/assets/img/content/fundamentalanalysis.webp',
      titleRus: 'Фундаментальный анализ рынка',
      titleEn: 'Fundamental Market Analysis',
      descrUkr:
        'Основи фундаментального аналізу: економічні показники, ставки центробанків, новини і як вони впливають на ринок та валютні курси.',
      descrEn:
        'The basics of fundamental analysis: economic indicators, central bank rates, news and how they affect the market and exchange rates.',
      descrRus:
        'Основы фундаментального анализа: экономические показатели, ставки центробанков, новости и как они влияют на рынок и валютные курсы.',
      realTitleRus: 'Фундаментальный анализ рынка | Arapov.trade',
      realTitleUkr: 'Фундаментальний аналіз ринку | Arapov.trade',
      realTitleEn: 'Fundamental Market Analysis | Arapov.trade',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 58,
    },
    {
      titleUkr: 'Торгівля активами: золото, нафта, індекси',
      linkUkr: 'assets-trading',
      imgUkr: '/assets/img/content/goldtrading1.jpeg',
      titleRus: 'Торговля активами: золото, нефть, индексы',
      titleEn: 'Trading Assets: Gold, Oil, Indices',
      descrUkr:
        'Як торгувати золотом, нафтою та фондовими індексами: фундаментальні драйвери, особливості інструментів і підходи до аналізу.',
      descrEn:
        'How to trade gold, oil and stock indices: the fundamental drivers, the features of each instrument and approaches to analysis.',
      descrRus:
        'Как торговать золотом, нефтью и фондовыми индексами: фундаментальные драйверы, особенности инструментов и подходы к анализу.',
      realTitleRus: 'Торговля активами: золото, нефть, индексы | Arapov.trade',
      realTitleUkr: 'Торгівля активами: золото, нафта, індекси | Arapov.trade',
      realTitleEn: 'Trading Assets: Gold, Oil, Indices | Arapov.trade',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 59,
    },
    {
      titleUkr: 'Облігації: купон, номінал, дохідність',
      linkUkr: 'bonds-guide',
      imgUkr: '/assets/img/content/bonds-guide.jpeg',
      titleRus: 'Облигации: купон, номинал, доходность',
      titleEn: 'Bonds: Coupon, Face Value, Yield',
      descrUkr:
        'Що таке облігації простими словами, як працюють купон, номінал і дохідність, які бувають види і наскільки вони надійні для інвестора.',
      descrEn:
        'What bonds are in simple terms, how coupon, face value and yield work, what types exist and how reliable they are for an investor.',
      descrRus:
        'Что такое облигации простыми словами, как работают купон, номинал и доходность, какие бывают виды и насколько они надёжны для инвестора.',
      realTitleRus: 'Облигации: купон, номинал, доходность | Arapov.trade',
      realTitleUkr: 'Облігації: купон, номінал, дохідність | Arapov.trade',
      realTitleEn: 'Bonds: Coupon, Face Value, Yield | Arapov.trade',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 60,
    },
    {
      titleUkr: 'Об’ємний аналіз ринку',
      linkUkr: 'volume-analysis',
      imgUkr: '/assets/img/content/volmarketanalisys.webp',
      titleRus: 'Объёмный анализ рынка',
      titleEn: 'Market Volume Analysis',
      descrUkr:
        'Як працює об’ємний аналіз ринку: профіль обсягу, кластери, дельта і чому обсяг — первинна причина руху ціни.',
      descrEn:
        'How market volume analysis works: volume profile, clusters, delta and why volume is the primary cause of price movement.',
      descrRus:
        'Как работает объёмный анализ рынка: профиль объёма, кластеры, дельта и почему объём — первичная причина движения цены.',
      realTitleRus: 'Объёмный анализ рынка | Arapov.trade',
      realTitleUkr: 'Об’ємний аналіз ринку | Arapov.trade',
      realTitleEn: 'Market Volume Analysis | Arapov.trade',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 61,
    },
    {
      titleUkr: 'Метод Вайкоффа',
      linkUkr: 'wyckoff-method',
      imgUkr: '/assets/img/content/wyckoffmethod.webp',
      titleRus: 'Метод Вайкоффа',
      titleEn: 'Wyckoff Method',
      descrUkr:
        'Метод Вайкоффа: фази накопичення та розподілу, дії великих гравців і як об’ємний аналіз виявляє ключові рівні ринку.',
      descrEn:
        'The Wyckoff method: accumulation and distribution phases, the actions of big players and how volume analysis reveals key market levels.',
      descrRus:
        'Метод Вайкоффа: фазы накопления и распределения, действия крупных игроков и как объёмный анализ выявляет ключевые уровни рынка.',
      realTitleRus: 'Метод Вайкоффа | Arapov.trade',
      realTitleUkr: 'Метод Вайкоффа | Arapov.trade',
      realTitleEn: 'Wyckoff Method | Arapov.trade',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 62,
    },
    {
      titleUkr: 'Психологія трейдингу: як контролювати емоції',
      linkUkr: 'trading-psychology',
      imgUkr: '/assets/img/content/emotionsaffect44.webp',
      titleRus: 'Психология трейдинга: как контролировать эмоции',
      titleEn: 'Trading Psychology: How to Control Emotions',
      descrUkr:
        'Як емоції впливають на трейдинг: страх, жадібність, FOMO і тільт. Когнітивні викривлення і техніки, які допомагають торгувати за системою.',
      descrEn:
        'How emotions affect trading: fear, greed, FOMO and tilt. The cognitive biases and the techniques that help you trade by the system.',
      descrRus:
        'Как эмоции влияют на трейдинг: страх, жадность, FOMO и тильт. Когнитивные искажения и техники, которые помогают торговать по системе.',
      realTitleRus:
        'Психология трейдинга: как контролировать эмоции | Arapov.trade',
      realTitleUkr:
        'Психологія трейдингу: як контролювати емоції | Arapov.trade',
      realTitleEn: 'Trading Psychology: How to Control Emotions | Arapov.trade',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 63,
    },
    {
      titleUkr: 'Усереднення та мартингейл у трейдингу',
      linkUkr: 'averaging-martingale',
      imgUkr: '/assets/img/content/averagingintrading.webp',
      titleRus: 'Усреднение и мартингейл в трейдинге',
      titleEn: 'Averaging and Martingale in Trading',
      descrUkr:
        'Що таке усереднення і метод мартінгейла, чому вони здаються вигідними і як саме зливають депозит новачків. Психологія і математика ризику.',
      descrEn:
        'What averaging and the martingale method are, why they look profitable and how exactly they drain a beginner’s deposit. The psychology and math of risk.',
      descrRus:
        'Что такое усреднение и метод мартингейла, почему они кажутся выгодными и как именно сливают депозит новичков. Психология и математика риска.',
      realTitleRus: 'Усреднение и мартингейл в трейдинге | Arapov.trade',
      realTitleUkr: 'Усереднення та мартингейл у трейдингу | Arapov.trade',
      realTitleEn: 'Averaging and Martingale in Trading | Arapov.trade',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 64,
    },
    {
      titleUkr: 'Стратегії трейдингу з нуля',
      linkUkr: 'practic',
      descrEn:
        'Self-study guide for trading by Igor Arapov: step-by-step course from scratch, real strategies and tips for a confident start in trading.',
      titleRus: 'Стратегия трейдинга для новичков',
      titleEn: 'Trading Strategy for Beginners',
      descrUkr:
        'Дізнайтесь практичні рекомендації з трейдингу: торгова система, точки входу, мані-менеджмент і ризики від ArapovTrade.',
      descrRus:
        'Узнайте, как построить торговую стратегию в трейдинге: правила входа и выхода, управление рисками, примеры систем для новичков и профи | Игорь Арапов',
      realTitleRus: 'Стратегия трейдинга для новичков | Arapov.trade',
      realTitleUkr: 'Стратегії трейдингу з нуля | Arapov.trade',
      realTitleEn: 'Trading Strategy for Beginners | Arapov.trade',
      imgUkr: '/assets/img/content/prakticuk.jpg',
      groupsRus: ['Примеры сделок'],
      groupsUkr: ['Приклади угод'],
      groupsEng: ['Trade Examples'],
      id: 65,
    },
  ];
}
