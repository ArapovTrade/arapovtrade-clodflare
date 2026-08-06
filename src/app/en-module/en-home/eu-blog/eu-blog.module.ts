import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnBlogHomepageComponent } from './en-blog-homepage/en-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoverEnComponent } from './cover-en/cover-en.component';
import { SearchblockEnComponent } from '../../../searchblock/searchblock-en/searchblock-en.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: CoverEnComponent,
    children: [
      { path: '', component: EnBlogHomepageComponent },
      {
        path: 'freeeducation',
        loadChildren: () =>
          import('../en-trading/fourty-five-en-artickle/fourty-five-en-artickle.module').then(
            (m) => m.FourtyFiveEnArtickleModule,
          ),
      },
      {
        path: 'about', //106
        loadChildren: () =>
          import('../eu-blog/onehundred-six-en-blog/onehundred-six-en-blog.module').then(
            (m) => m.OnehundredSixEnBlogModule,
          ),
      },
      {
        path: 'tradingview-record', //107
        loadChildren: () =>
          import('../eu-blog/onehundred-seven-en-blog/onehundred-seven-en-blog.module').then(
            (m) => m.OnehundredSevenEnBlogModule,
          ),
      },
      
       {
        path: 'practic', //64
        loadChildren: () =>
          import('../eu-blog/sixty-four-en-blog/sixty-four-en-blog.module').then(
            (m) => m.SixtyFourEnBlogModule,
          ),
      },
      {
        path: 'imbalance-fvg', 
        loadChildren: () =>
          import('./one-en-blog/one-en-blog.module').then(
            (m) => m.OneEnBlogModule,
          ),
      },
      {
        path: 'liquidity-pools',
        loadChildren: () =>
          import('./two-en-blog/two-en-blog.module').then(
            (m) => m.TwoEnBlogModule,
          ),
      },
      {
        path: 'order-block',
        loadChildren: () =>
          import('./three-en-blog/three-en-blog.module').then(
            (m) => m.ThreeEnBlogModule,
          ),
      },
      {
        path: 'smart-money-guide',
        loadChildren: () =>
          import('./four-en-blog/four-en-blog.module').then(
            (m) => m.FourEnBlogModule,
          ),
      },
      {
        path: 'xrp-ripple',
        loadChildren: () =>
          import('./five-en-blog/five-en-blog.module').then(
            (m) => m.FiveEnBlogModule,
          ),
      },
      {
        path: 'bitcoin-dominance',
        loadChildren: () =>
          import('./six-en-blog/six-en-blog.module').then(
            (m) => m.SixEnBlogModule,
          ),
      },
      {
        path: 'bitcoin-etf',
        loadChildren: () =>
          import('./seven-en-blog/seven-en-blog.module').then(
            (m) => m.SevenEnBlogModule,
          ),
      },
      {
        path: 'bitcoin-guide',
        loadChildren: () =>
          import('./eight-en-blog/eight-en-blog.module').then(
            (m) => m.EightEnBlogModule,
          ),
      },
      {
        path: 'bitcoin-halving',
        loadChildren: () =>
          import('./nine-en-blog/nine-en-blog.module').then(
            (m) => m.NineEnBlogModule,
          ),
      },
      {
        path: 'crypto-arbitrage',
        loadChildren: () =>
          import('./ten-en-blog/ten-en-blog.module').then(
            (m) => m.TenEnBlogModule,
          ),
      },
      {
        path: 'crypto-basics', //11
        loadChildren: () =>
          import('./eleven-en-blog/eleven-en-blog.module').then(
            (m) => m.ElevenEnBlogModule,
          ),
      },
      // {
      //   path: 'crypto-perpetuals-margin', //12
      //   loadChildren: () =>
      //     import('./twelve-en-blog/twelve-en-blog.module').then(
      //       (m) => m.TwelveEnBlogModule,
      //     ),
      // },
      {
        path: 'crypto-perpetuals-margin', //13
        loadChildren: () =>
          import('./thirteen-en-blog/thirteen-en-blog.module').then(
            (m) => m.ThirteenEnBlogModule,
          ),
      },
      {
        path: 'crypto-risks-scams', //14
        loadChildren: () =>
          import('./fourteen-en-blog/fourteen-en-blog.module').then(
            (m) => m.FourteenEnBlogModule,
          ),
      },
      {
        path: 'crypto-staking', //15
        loadChildren: () =>
          import('./fiveteen-en-blog/fiveteen-en-blog.module').then(
            (m) => m.FiveteenEnBlogModule,
          ),
      },
      {
        path: 'ethereum-guide', //16
        loadChildren: () =>
          import('./sixteen-en-blog/sixteen-en-blog.module').then(
            (m) => m.SixteenEnBlogModule,
          ),
      },
      {
        path: 'memecoins', //17
        loadChildren: () =>
          import('./seventeen-en-blog/seventeen-en-blog.module').then(
            (m) => m.SeventeenEnBlogModule,
          ),
      },
      {
        path: 'stablecoins-tether', //18
        loadChildren: () =>
          import('./eighteen-en-blog/eighteen-en-blog.module').then(
            (m) => m.EighteenEnBlogModule,
          ),
      },
      {
        path: 'tokenomics', //19
        loadChildren: () =>
          import('./nineteen-en-blog/nineteen-en-blog.module').then(
            (m) => m.NineteenEnBlogModule,
          ),
      },
      {
        path: 'crypto-storage', //20
        loadChildren: () =>
          import('./twenty-en-blog/twenty-en-blog.module').then(
            (m) => m.TwentyEnBlogModule,
          ),
      },
      {
        path: 'solana-guide', //21
        loadChildren: () =>
          import('./twenty-one-en-blog/twenty-one-en-blog.module').then(
            (m) => m.TwentyOneEnBlogModule,
          ),
      },
      {
        path: 'defi', //22
        loadChildren: () =>
          import('./twenty-two-en-blog/twenty-two-en-blog.module').then(
            (m) => m.TwentyTwoEnBlogModule,
          ),
      },
      {
        path: 'volume-analysis', //23
        loadChildren: () =>
          import('./twenty-three-en-blog/twenty-three-en-blog.module').then(
            (m) => m.TwentyThreeEnBlogModule,
          ),
      },
      {
        path: 'wyckoff-method', //24
        loadChildren: () =>
          import('./twenty-four-en-blog/twenty-four-en-blog.module').then(
            (m) => m.TwentyFourEnBlogModule,
          ),
      },
      {
        path: 'averaging-martingale', //25
        loadChildren: () =>
          import('./twenty-five-en-blog/twenty-five-en-blog.module').then(
            (m) => m.TwentyFiveEnBlogModule,
          ),
      },
      {
        path: 'trading-psychology', //26
        loadChildren: () =>
          import('./twenty-six-en-blog/twenty-six-en-blog.module').then(
            (m) => m.TwentySixEnBlogModule,
          ),
      },
      {
        path: 'assets-trading', //27
        loadChildren: () =>
          import('./twenty-seven-en-blog/twenty-seven-en-blog.module').then(
            (m) => m.TwentySevenEnBlogModule,
          ),
      },
      {
        path: 'fundamental-analysis', //28
        loadChildren: () =>
          import('./twenty-eight-en-blog/twenty-eight-en-blog.module').then(
            (m) => m.TwentyEightEnBlogModule,
          ),
      },
      {
        path: 'bonds-guide', //29
        loadChildren: () =>
          import('./twenty-nine-en-blog/twenty-nine-en-blog.module').then(
            (m) => m.TwentyNineEnBlogModule,
          ),
      },
      {
        path: 'derivatives-futures-spot', //30
        loadChildren: () =>
          import('./thirty-en-blog/thirty-en-blog.module').then(
            (m) => m.ThirtyEnBlogModule,
          ),
      },
      {
        path: 'forex-guide', //31
        loadChildren: () =>
          import('./thirty-one-eu-blog/thirty-one-eu-blog.module').then(
            (m) => m.ThirtyOneEuBlogModule,
          ),
      }, 
      {
        path: 'how-exchange-works', //32
        loadChildren: () =>
          import('./thirty-two-eu-blog/thirty-two-eu-blog.module').then(
            (m) => m.ThirtyTwoEuBlogModule,
          ),
      },
      {
        path: 'market-microstructure', //33
        loadChildren: () =>
          import('./thirty-three-eu-blog/thirty-three-eu-blog.module').then(
            (m) => m.ThirtyThreeEuBlogModule,
          ),
      },
      {
        path: 'order-types', //34
        loadChildren: () =>
          import('./thirty-four-eu-blog/thirty-four-eu-blog.module').then(
            (m) => m.ThirtyFourEuBlogModule,
          ),
      },
      {
        path: 'trading-vs-investing', //35
        loadChildren: () =>
          import('./thirty-five-eu-blog/thirty-five-eu-blog.module').then(
            (m) => m.ThirtyFiveEuBlogModule,
          ),
      },
      {
        path: 'copy-trading', //36
        loadChildren: () =>
          import('./thirty-six-eu-blog/thirty-six-eu-blog.module').then(
            (m) => m.ThirtySixEuBlogModule,
          ),
      },
      {
        path: 'platforms-broker', //37
        loadChildren: () =>
          import('./thirty-seven-eu-blog/thirty-seven-eu-blog.module').then(
            (m) => m.ThirtySevenEuBlogModule,
          ),
      },
      {
        path: 'prop-trading', //38
        loadChildren: () =>
          import('./thirty-eight-eu-blog/thirty-eight-eu-blog.module').then(
            (m) => m.ThirtyEightEuBlogModule,
          ),
      },
      {
        path: 'risk-management', //39
        loadChildren: () =>
          import('./thirty-nine-eu-blog/thirty-nine-eu-blog.module').then(
            (m) => m.ThirtyNineEuBlogModule,
          ),
      },
      {
        path: 'trade-management', //40
        loadChildren: () =>
          import('./fourty-eu-blog/fourty-eu-blog.module').then(
            (m) => m.FourtyEuBlogModule,
          ),
      },
      {
        path: 'trading-for-beginners', //41
        loadChildren: () =>
          import('./fourty-one-en-blog/fourty-one-en-blog.module').then(
            (m) => m.FourtyOneEnBlogModule,
          ),
      },
      {
        path: 'trading-styles', //42
        loadChildren: () =>
          import('./fourty-two-en-blog/fourty-two-en-blog.module').then(
            (m) => m.FourtyTwoEnBlogModule,
          ),
      },
      {
        path: 'trading-system', //43
        loadChildren: () =>
          import('./fourty-three-en-blog/fourty-three-en-blog.module').then(
            (m) => m.FourtyThreeEnBlogModule,
          ),
      },
      {
        path: 'stochastic-oscillator', //44
        loadChildren: () =>
          import('./fourty-four-en-blog/fourty-four-en-blog.module').then(
            (m) => m.FourtyFourEnBlogModule,
          ),
      },
      {
        path: 'rsi-indicator', //45
        loadChildren: () =>
          import('./fourty-five-en-blog/fourty-five-en-blog.module').then(
            (m) => m.FourtyFiveEnBlogModule,
          ),
      },
      {
        path: 'moving-averages', //46
        loadChildren: () =>
          import('./fourty-six-en-blog/fourty-six-en-blog.module').then(
            (m) => m.FourtySixEnBlogModule,
          ),
      },
      {
        path: 'macd-indicator', //47
        loadChildren: () =>
          import('./fourty-seven-en-blog/fourty-seven-en-blog.module').then(
            (m) => m.FourtySevenEnBlogModule,
          ),
      },
      {
        path: 'elliott-waves', //48
        loadChildren: () =>
          import('./fourty-eight-en-blog/fourty-eight-en-blog.module').then(
            (m) => m.FourtyEightEnBlogModule,
          ),
      },
      {
        path: 'fibonacci-levels', //49
        loadChildren: () =>
          import('./fourty-nine-en-blog/fourty-nine-en-blog.module').then(
            (m) => m.FourtyNineEnBlogModule,
          ),
      },
      {
        path: 'bollinger-bands', //50
        loadChildren: () =>
          import('./fifty-en-blog/fifty-en-blog.module').then(
            (m) => m.FiftyEnBlogModule,
          ),
      },
      {
        path: 'atr-indicator', //51
        loadChildren: () =>
          import('./fifty-one-eu-blog/fifty-one-eu-blog.module').then(
            (m) => m.FiftyOneEuBlogModule,
          ),
      },
      {
        path: 'adx-indicator', //52
        loadChildren: () =>
          import('./fifty-two-eu-blog/fifty-two-eu-blog.module').then(
            (m) => m.FiftyTwoEuBlogModule,
          ),
      },
      {
        path: 'chart-reading', //53
        loadChildren: () =>
          import('./fifty-three-eu-blog/fifty-three-eu-blog.module').then(
            (m) => m.FiftyThreeEuBlogModule,
          ),
      },
      {
        path: 'chart-patterns', //54
        loadChildren: () =>
          import('./fifty-four-eu-blog/fifty-four-eu-blog.module').then(
            (m) => m.FiftyFourEuBlogModule,
          ),
      },
      {
        path: 'candlestick-patterns', //55
        loadChildren: () =>
          import('./fifty-five-eu-blog/fifty-five-eu-blog.module').then(
            (m) => m.FiftyFiveEuBlogModule,
          ),
      },
      {
        path: 'breakout-strategy', //56
        loadChildren: () =>
          import('./fifty-six-eu-blog/fifty-six-eu-blog.module').then(
            (m) => m.FiftySixEuBlogModule,
          ),
      },
      {
        path: 'vwap-indicator', //57
        loadChildren: () =>
          import('./fifty-seven-eu-blog/fifty-seven-eu-blog.module').then(
            (m) => m.FiftySevenEuBlogModule,
          ),
      },
      {
        path: 'ichimoku-cloud', //58
        loadChildren: () =>
          import('./fifty-eight-eu-blog/fifty-eight-eu-blog.module').then(
            (m) => m.FiftyEightEuBlogModule,
          ),
      },
      {
        path: 'ai-in-trading', //59
        loadChildren: () =>
          import('./fifty-nine-eu-blog/fifty-nine-eu-blog.module').then(
            (m) => m.FiftyNineEuBlogModule,
          ),
      },
      {
        path: 'trading-indicators', //60
        loadChildren: () =>
          import('./sixty-eu-blog/sixty-eu-blog.module').then(
            (m) => m.SixtyEuBlogModule,
          ),
      },
      // {
      //   path: 'adviceforbeginners',
      //   loadChildren: () =>
      //     import('../en-trading/one-en-article/one-en-article.module').then(
      //       (m) => m.OneEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'marketbasics',
      //   loadChildren: () =>
      //     import('../en-trading/two-en-article/two-en-article.module').then(
      //       (m) => m.TwoEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'exchange',
      //   loadChildren: () =>
      //     import('../en-trading/three-en-article/three-en-article.module').then(
      //       (m) => m.ThreeEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'exchangemarket',
      //   loadChildren: () =>
      //     import('../en-trading/four-en-article/four-en-article.module').then(
      //       (m) => m.FourEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'derivatives',
      //   loadChildren: () =>
      //     import('../en-trading/five-en-article/five-en-article.module').then(
      //       (m) => m.FiveEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'stablecoins',
      //   loadChildren: () =>
      //     import('../en-trading/six-en-article/six-en-article.module').then(
      //       (m) => m.SixEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'forexmarket',
      //   loadChildren: () =>
      //     import('../en-trading/seven-en-article/seven-en-article.module').then(
      //       (m) => m.SevenEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'currenciesandquotes',
      //   loadChildren: () =>
      //     import('../en-trading/eight-en-article/eight-en-article.module').then(
      //       (m) => m.EightEnArticleModule,
      //     ),
      // },
      // {
      //   path: 'formationexchange',
      //   loadChildren: () =>
      //     import('../en-trading/nine-en-artickle/nine-en-artickle.module').then(
      //       (m) => m.NineEnArtickleModule,
      //     ),
      // },

      // {
      //   path: 'currencyposition',
      //   loadChildren: () =>
      //     import('../en-trading/ten-en-artickle/ten-en-artickle.module').then(
      //       (m) => m.TenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'cryptostart',
      //   loadChildren: () =>
      //     import('../en-trading/eleven-en-artickle/eleven-en-artickle.module').then(
      //       (m) => m.ElevenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'halving',
      //   loadChildren: () =>
      //     import('../en-trading/twelve-en-artickle/twelve-en-artickle.module').then(
      //       (m) => m.TwelveEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'riskcurrencyexchange',
      //   loadChildren: () =>
      //     import('../en-trading/thirteen-en-artickle/thirteen-en-artickle.module').then(
      //       (m) => m.ThirteenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'forexleveragerisk',
      //   loadChildren: () =>
      //     import('../en-trading/fourteen-en-artickle/fourteen-en-artickle.module').then(
      //       (m) => m.FourteenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'majorbankfrs',
      //   loadChildren: () =>
      //     import('../en-trading/fifteen-en-artickle/fifteen-en-artickle.module').then(
      //       (m) => m.FifteenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'ethereum',
      //   loadChildren: () =>
      //     import('../en-trading/sixteen-en-artickle/sixteen-en-artickle.module').then(
      //       (m) => m.SixteenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'bitcoin',
      //   loadChildren: () =>
      //     import('../en-trading/seventeen-en-artickle/seventeen-en-artickle.module').then(
      //       (m) => m.SeventeenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'psychorisks',
      //   loadChildren: () =>
      //     import('../en-trading/eighteen-en-artickle/eighteen-en-artickle.module').then(
      //       (m) => m.EighteenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'howtotradeonforex',
      //   loadChildren: () =>
      //     import('../en-trading/nineteen-en-artickle/nineteen-en-artickle.module').then(
      //       (m) => m.NineteenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'steidlmayeranalysis',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-en-artickle/twenty-en-artickle.module').then(
      //       (m) => m.TwentyEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'marketanalysisforex',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-one-en-artickle/twenty-one-en-artickle.module').then(
      //       (m) => m.TwentyOneEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'econimicfactors',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-two-en-artickle/twenty-two-en-artickle.module').then(
      //       (m) => m.TwentyTwoEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'worldstockindicates',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-three-en-artickle/twenty-three-en-artickle.module').then(
      //       (m) => m.TwentyThreeEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'fibonaccilevels',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-four-en-artickle/twenty-four-en-artickle.module').then(
      //       (m) => m.TwentyFourEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'keyeconomicgrowth',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-five-en-artickle/twenty-five-en-artickle.module').then(
      //       (m) => m.TwentyFiveEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'technicalanalysis',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-six-en-artickle/twenty-six-en-artickle.module').then(
      //       (m) => m.TwentySixEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'technicalmarketcharts',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-seven-en-artickle/twenty-seven-en-artickle.module').then(
      //       (m) => m.TwentySevenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'keypricepattern',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-eight-en-artickle/twenty-eight-en-artickle.module').then(
      //       (m) => m.TwentyEightEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'smartmonettraps',
      //   loadChildren: () =>
      //     import('../en-trading/twenty-nine-en-artickle/twenty-nine-en-artickle.module').then(
      //       (m) => m.TwentyNineEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'imbalanceandfvg',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-en-artickle/thirty-en-artickle.module').then(
      //       (m) => m.ThirtyEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'marketorder',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-one-en-artickle/thirty-one-en-artickle.module').then(
      //       (m) => m.ThirtyOneEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stoporder',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-two-en-artickle/thirty-two-en-artickle.module').then(
      //       (m) => m.ThirtyTwoEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'requotes',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-three-en-artickle/thirty-three-en-artickle.module').then(
      //       (m) => m.ThirtyThreeEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stoplimitorder',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-four-en-artickle/thirty-four-en-artickle.module').then(
      //       (m) => m.ThirtyFourEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'tradingsystem',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-five-en-artickle/thirty-five-en-artickle.module').then(
      //       (m) => m.ThirtyFiveEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'falsebreakouts',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-six-en-artickle/thirty-six-en-artickle.module').then(
      //       (m) => m.ThirtySixEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stophunting',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-seven-en-artickle/thirty-seven-en-artickle.module').then(
      //       (m) => m.ThirtySevenEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'capitalmanagement',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-eight-en-artickle/thirty-eight-en-artickle.module').then(
      //       (m) => m.ThirtyEightEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'profitandlossratio',
      //   loadChildren: () =>
      //     import('../en-trading/thirty-nine-en-artickle/thirty-nine-en-artickle.module').then(
      //       (m) => m.ThirtyNineEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'beginnermistakes',
      //   loadChildren: () =>
      //     import('../en-trading/fourty-en-artickle/fourty-en-artickle.module').then(
      //       (m) => m.FourtyEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'tradingplan',
      //   loadChildren: () =>
      //     import('../en-trading/fourty-one-en-artickle/fourty-one-en-artickle.module').then(
      //       (m) => m.FourtyOneEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'timeframes',
      //   loadChildren: () =>
      //     import('../en-trading/fourty-two-en-artickle/fourty-two-en-artickle.module').then(
      //       (m) => m.FourtyTwoEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'liquiditypools',
      //   loadChildren: () =>
      //     import('../en-trading/fourty-three-en-artickle/fourty-three-en-artickle.module').then(
      //       (m) => m.FourtyThreeEnArtickleModule,
      //     ),
      // },
      // {
      //   path: 'icebergorders',
      //   loadChildren: () =>
      //     import('../en-trading/fourty-four-en-artickle/fourty-four-en-artickle.module').then(
      //       (m) => m.FourtyFourEnArtickleModule,
      //     ),
      // },

      // {
      //   path: 'cryptotether',
      //   loadChildren: () =>
      //     import('../en-trading/fourty-six-en-artickle/fourty-six-en-artickle.module').then(
      //       (m) => m.FourtySixEnArtickleModule,
      //     ),
      // },

      // {
      //   path: 'smartmoneyconceptsguide', //61
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-one-en-blog/sixty-one-en-blog.module').then(
      //       (m) => m.SixtyOneEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneystrategies', //62
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-two-en-blog/sixty-two-en-blog.module').then(
      //       (m) => m.SixtyTwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneycontrol', //63
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-three-en-blog/sixty-three-en-blog.module').then(
      //       (m) => m.SixtyThreeEnBlogModule,
      //     ),
      // },
     
      // {
      //   path: 'stockorderbook', //65
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-five-en-blog/sixty-five-en-blog.module').then(
      //       (m) => m.SixtyFiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'peakvolumelevels', //66
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-six-en-blog/sixty-six-en-blog.module').then(
      //       (m) => m.SixtySixEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'trendvolumeanalysis', //67
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-seven-en-blog/sixty-seven-en-blog.module').then(
      //       (m) => m.SixtySevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'marketauctiondevelops', //68
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-eight-en-blog/sixty-eight-en-blog.module').then(
      //       (m) => m.SixtyEightEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'volumeandfuturesmarket', //69
      //   loadChildren: () =>
      //     import('../eu-blog/sixty-nine-en-blog/sixty-nine-en-blog.module').then(
      //       (m) => m.SixtyNineEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'wyckoffsvolumeconcept', //70
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-en-blog/seventy-en-blog.module').then(
      //       (m) => m.SeventyEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'newstrading', //71
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-one-en-blog/seventy-one-en-blog.module').then(
      //       (m) => m.SeventyOneEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'economiccalendar', //72
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-two-en-blog/seventy-two-en-blog.module').then(
      //       (m) => m.SeventyTwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'macroeconomicindicators', //73
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-three-en-blog/seventy-three-en-blog.module').then(
      //       (m) => m.SeventyThreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'globalfundamentalanalysis', //74
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-four-en-blog/seventy-four-en-blog.module').then(
      //       (m) => m.SeventyFourEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'gamblingorbusiness', //75
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-five-en-blog/seventy-five-en-blog.module').then(
      //       (m) => m.SeventyFiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'williamgannpsychology', //76
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-six-en-blog/seventy-six-en-blog.module').then(
      //       (m) => m.SeventySixEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'emotionsaffect', //77
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-seven-en-blog/seventy-seven-en-blog.module').then(
      //       (m) => m.SeventySevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'fomo', //78
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-eight-en-blog/seventy-eight-en-blog.module').then(
      //       (m) => m.SeventyEightEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'psychologyofaveraging', //79
      //   loadChildren: () =>
      //     import('../eu-blog/seventy-nine-en-blog/seventy-nine-en-blog.module').then(
      //       (m) => m.SeventyNineEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'headandshoulders', //80
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-en-blog/eighty-en-blog.module').then(
      //       (m) => m.EightyEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'trianglefigure', //81
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-one-en-blog/eighty-one-en-blog.module').then(
      //       (m) => m.EightyOneEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'flagandpennant', //82
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-two-en-blog/eighty-two-en-blog.module').then(
      //       (m) => m.EightyTwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'cupandhandle', //83
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-three-en-blog/eighty-three-en-blog.module').then(
      //       (m) => m.EightyThreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'engulfing', //84
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-four-en-blog/eighty-four-en-blog.module').then(
      //       (m) => m.EightyFourEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'doubletopandbottom', //85
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-five-en-blog/eighty-five-en-blog.module').then(
      //       (m) => m.EightyFiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'pattern-1-2-3', //86
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-six-en-blog/eighty-six-en-blog.module').then(
      //       (m) => m.EightySixEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'copytrading', //87
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-seven-en-blog/eighty-seven-en-blog.module').then(
      //       (m) => m.EightySevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'tradingview-platform', //88
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-eight-en-blog/eighty-eight-en-blog.module').then(
      //       (m) => m.EightyEightEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'bitcoin-domination', //89
      //   loadChildren: () =>
      //     import('../eu-blog/eighty-nine-en-blog/eighty-nine-en-blog.module').then(
      //       (m) => m.EightyNineEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'metodmartingejla', //90
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-en-blog/ninty-en-blog.module').then(
      //       (m) => m.NintyEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'tiltintrading', //91
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-one-en-blog/ninty-one-en-blog.module').then(
      //       (m) => m.NintyOneEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'binarnyeopciony', //92
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-two-en-blog/ninty-two-en-blog.module').then(
      //       (m) => m.NintyTwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'atrindikator', //93
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-three-en-blog/ninty-three-en-blog.module').then(
      //       (m) => m.NintyThreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'spread', //94
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-four-en-blog/ninty-four-en-blog.module').then(
      //       (m) => m.NintyFourEnBlogModule,
      //     ),
      // },

      // {
      //   path: 'goldtrading', //95
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-five-en-blog/ninty-five-en-blog.module').then(
      //       (m) => m.NintyFiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'oiltrading', //96
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-six-en-blog/ninty-six-en-blog.module').then(
      //       (m) => m.NintySixEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'rsiindicator', //97
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-seven-en-blog/ninty-seven-en-blog.module').then(
      //       (m) => m.NintySevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'stochastic', //98
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-eight-en-blog/ninty-eight-en-blog.module').then(
      //       (m) => m.NintyEightEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'macdindicator', //99
      //   loadChildren: () =>
      //     import('../eu-blog/ninty-nine-en-blog/ninty-nine-en-blog.module').then(
      //       (m) => m.NintyNineEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'sp500trading', //100
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-en-blog/onehundred-en-blog.module').then(
      //       (m) => m.OnehundredEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'vwap', //101
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-one-en-blog/onehundred-one-en-blog.module').then(
      //       (m) => m.OnehundredOneEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'bollingerbands', //102
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-two-en-blog/onehundred-two-en-blog.module').then(
      //       (m) => m.OnehundredTwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'ichimoku', //103
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-three-en-blog/onehundred-three-en-blog.module').then(
      //       (m) => m.OnehundredThreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'solana', //104
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-four-en-blog/onehundred-four-en-blog.module').then(
      //       (m) => m.OnehundredFourEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'xrp', //105
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-five-en-blog/onehundred-five-en-blog.module').then(
      //       (m) => m.OnehundredFiveEnBlogModule,
      //     ),
      // },

      // {
      //   path: 'bitcoin-crash-stops', //111
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eleven-en-blog/onehundred-eleven-en-blog.module').then(
      //       (m) => m.OnehundredElevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'adx', //112
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twelve-en-blog/onehundred-twelve-en-blog.module').then(
      //       (m) => m.OnehundredTwelveEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'ai-trading', //113
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirteen-en-blog/onehundred-thirteen-en-blog.module').then(
      //       (m) => m.OnehundredThirteenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'airdrop', //114
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fourteen-en-blog/onehundred-fourteen-en-blog.module').then(
      //       (m) => m.OnehundredFourteenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'altseason', //115
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fifteen-en-blog/onehundred-fifteen-en-blog.module').then(
      //       (m) => m.OnehundredFifteenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'backtest', //116
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixteen-en-blog/onehundred-sixteen-en-blog.module').then(
      //       (m) => m.OnehundredSixteenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'bonds-coupon-yield', //117
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventeen-en-blog/onehundred-seventeen-en-blog.module').then(
      //       (m) => m.OnehundredSeventeenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'breaker-mitigation-blocks', //118
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eighteen-en-blog/onehundred-eighteen-en-blog.module').then(
      //       (m) => m.OnehundredEighteenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'breakeven', //119
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-nineteen-en-blog/onehundred-nineteen-en-blog.module').then(
      //       (m) => m.OnehundredNineteenEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'bull-bear-market', //120
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twenty-en-blog/onehundred-twenty-en-blog.module').then(
      //       (m) => m.OnehundredTwentyEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'can-ai-predict-price', //121
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentyone-en-blog/onehundred-twentyone-en-blog.module').then(
      //       (m) => m.OnehundredTwentyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'candle-hammer-doji-star', //122
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentytwo-en-blog/onehundred-twentytwo-en-blog.module').then(
      //       (m) => m.OnehundredTwentytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: 'carrytrade', //123
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentythree-en-blog/onehundred-twentythree-en-blog.module').then(
      //       (m) => m.OnehundredTwentythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '124', //124
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentyfour-en-blog/onehundred-twentyfour-en-blog.module').then(
      //       (m) => m.OnehundredTwentyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '125', //125
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentyfive-en-blog/onehundred-twentyfive-en-blog.module').then(
      //       (m) => m.OnehundredTwentyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '126', //126
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentysix-en-blog/onehundred-twentysix-en-blog.module').then(
      //       (m) => m.OnehundredTwentysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '127', //127
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentyseven-en-blog/onehundred-twentyseven-en-blog.module').then(
      //       (m) => m.OnehundredTwentysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '128', //128
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentyeight-en-blog/onehundred-twentyeight-en-blog.module').then(
      //       (m) => m.OnehundredTwentyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '129', //129
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-twentynine-en-blog/onehundred-twentynine-en-blog.module').then(
      //       (m) => m.OnehundredTwentynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '130', //130
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirty-en-blog/onehundred-thirty-en-blog.module').then(
      //       (m) => m.OnehundredThirtyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '131', //131
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtyone-en-blog/onehundred-thirtyone-en-blog.module').then(
      //       (m) => m.OnehundredThirtyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '132', //132
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtytwo-en-blog/onehundred-thirtytwo-en-blog.module').then(
      //       (m) => m.OnehundredThirtytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '133', //133
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtythree-en-blog/onehundred-thirtythree-en-blog.module').then(
      //       (m) => m.OnehundredThirtythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '134', //134
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtyfour-en-blog/onehundred-thirtyfour-en-blog.module').then(
      //       (m) => m.OnehundredThirtyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '135', //135
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtyfive-en-blog/onehundred-thirtyfive-en-blog.module').then(
      //       (m) => m.OnehundredThirtyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '136', //136
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtysix-en-blog/onehundred-thirtysix-en-blog.module').then(
      //       (m) => m.OnehundredThirtysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '137', //137
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtyseven-en-blog/onehundred-thirtyseven-en-blog.module').then(
      //       (m) => m.OnehundredThirtysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '138', //138
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtyeight-en-blog/onehundred-thirtyeight-en-blog.module').then(
      //       (m) => m.OnehundredThirtyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '139', //139
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-thirtynine-en-blog/onehundred-thirtynine-en-blog.module').then(
      //       (m) => m.OnehundredThirtynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '140', //140
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-forty-en-blog/onehundred-forty-en-blog.module').then(
      //       (m) => m.OnehundredFortyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '141', //141
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortyone-en-blog/onehundred-fortyone-en-blog.module').then(
      //       (m) => m.OnehundredFortyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '142', //142
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortytwo-en-blog/onehundred-fortytwo-en-blog.module').then(
      //       (m) => m.OnehundredFortytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '143', //143
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortythree-en-blog/onehundred-fortythree-en-blog.module').then(
      //       (m) => m.OnehundredFortythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '144', //144
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortyfour-en-blog/onehundred-fortyfour-en-blog.module').then(
      //       (m) => m.OnehundredFortyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '145', //145
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortyfive-en-blog/onehundred-fortyfive-en-blog.module').then(
      //       (m) => m.OnehundredFortyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '146', //146
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortysix-en-blog/onehundred-fortysix-en-blog.module').then(
      //       (m) => m.OnehundredFortysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '147', //147
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortyseven-en-blog/onehundred-fortyseven-en-blog.module').then(
      //       (m) => m.OnehundredFortysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '148', //148
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortyeight-en-blog/onehundred-fortyeight-en-blog.module').then(
      //       (m) => m.OnehundredFortyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '149', //149
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fortynine-en-blog/onehundred-fortynine-en-blog.module').then(
      //       (m) => m.OnehundredFortynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '150', //150
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fifty-en-blog/onehundred-fifty-en-blog.module').then(
      //       (m) => m.OnehundredFiftyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '151', //151
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftyone-en-blog/onehundred-fiftyone-en-blog.module').then(
      //       (m) => m.OnehundredFiftyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '152', //152
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftytwo-en-blog/onehundred-fiftytwo-en-blog.module').then(
      //       (m) => m.OnehundredFiftytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '153', //153
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftythree-en-blog/onehundred-fiftythree-en-blog.module').then(
      //       (m) => m.OnehundredFiftythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '154', //154
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftyfour-en-blog/onehundred-fiftyfour-en-blog.module').then(
      //       (m) => m.OnehundredFiftyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '155', //155
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftyfive-en-blog/onehundred-fiftyfive-en-blog.module').then(
      //       (m) => m.OnehundredFiftyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '156', //156
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftysix-en-blog/onehundred-fiftysix-en-blog.module').then(
      //       (m) => m.OnehundredFiftysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '157', //157
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftyseven-en-blog/onehundred-fiftyseven-en-blog.module').then(
      //       (m) => m.OnehundredFiftysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '158', //158
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftyeight-en-blog/onehundred-fiftyeight-en-blog.module').then(
      //       (m) => m.OnehundredFiftyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '159', //159
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-fiftynine-en-blog/onehundred-fiftynine-en-blog.module').then(
      //       (m) => m.OnehundredFiftynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '160', //160
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixty-en-blog/onehundred-sixty-en-blog.module').then(
      //       (m) => m.OnehundredSixtyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '161', //161
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtyone-en-blog/onehundred-sixtyone-en-blog.module').then(
      //       (m) => m.OnehundredSixtyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '162', //162
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtytwo-en-blog/onehundred-sixtytwo-en-blog.module').then(
      //       (m) => m.OnehundredSixtytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '163', //163
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtythree-en-blog/onehundred-sixtythree-en-blog.module').then(
      //       (m) => m.OnehundredSixtythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '164', //164
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtyfour-en-blog/onehundred-sixtyfour-en-blog.module').then(
      //       (m) => m.OnehundredSixtyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '165', //165
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtyfive-en-blog/onehundred-sixtyfive-en-blog.module').then(
      //       (m) => m.OnehundredSixtyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '166', //166
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtysix-en-blog/onehundred-sixtysix-en-blog.module').then(
      //       (m) => m.OnehundredSixtysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '167', //167
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtyseven-en-blog/onehundred-sixtyseven-en-blog.module').then(
      //       (m) => m.OnehundredSixtysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '168', //168
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtyeight-en-blog/onehundred-sixtyeight-en-blog.module').then(
      //       (m) => m.OnehundredSixtyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '169', //169
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-sixtynine-en-blog/onehundred-sixtynine-en-blog.module').then(
      //       (m) => m.OnehundredSixtynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '170', //170
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventy-en-blog/onehundred-seventy-en-blog.module').then(
      //       (m) => m.OnehundredSeventyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '171', //171
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventyone-en-blog/onehundred-seventyone-en-blog.module').then(
      //       (m) => m.OnehundredSeventyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '172', //172
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventytwo-en-blog/onehundred-seventytwo-en-blog.module').then(
      //       (m) => m.OnehundredSeventytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '173', //173
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventythree-en-blog/onehundred-seventythree-en-blog.module').then(
      //       (m) => m.OnehundredSeventythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '174', //174
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventyfour-en-blog/onehundred-seventyfour-en-blog.module').then(
      //       (m) => m.OnehundredSeventyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '175', //175
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventyfive-en-blog/onehundred-seventyfive-en-blog.module').then(
      //       (m) => m.OnehundredSeventyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '176', //176
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventysix-en-blog/onehundred-seventysix-en-blog.module').then(
      //       (m) => m.OnehundredSeventysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '177', //177
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventyseven-en-blog/onehundred-seventyseven-en-blog.module').then(
      //       (m) => m.OnehundredSeventysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '178', //178
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventyeight-en-blog/onehundred-seventyeight-en-blog.module').then(
      //       (m) => m.OnehundredSeventyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '179', //179
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-seventynine-en-blog/onehundred-seventynine-en-blog.module').then(
      //       (m) => m.OnehundredSeventynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '180', //180
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eighty-en-blog/onehundred-eighty-en-blog.module').then(
      //       (m) => m.OnehundredEightyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '181', //181
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightyone-en-blog/onehundred-eightyone-en-blog.module').then(
      //       (m) => m.OnehundredEightyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '182', //182
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightytwo-en-blog/onehundred-eightytwo-en-blog.module').then(
      //       (m) => m.OnehundredEightytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '183', //183
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightythree-en-blog/onehundred-eightythree-en-blog.module').then(
      //       (m) => m.OnehundredEightythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '184', //184
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightyfour-en-blog/onehundred-eightyfour-en-blog.module').then(
      //       (m) => m.OnehundredEightyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '185', //185
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightyfive-en-blog/onehundred-eightyfive-en-blog.module').then(
      //       (m) => m.OnehundredEightyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '186', //186
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightysix-en-blog/onehundred-eightysix-en-blog.module').then(
      //       (m) => m.OnehundredEightysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '187', //187
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightyseven-en-blog/onehundred-eightyseven-en-blog.module').then(
      //       (m) => m.OnehundredEightysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '188', //188
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightyeight-en-blog/onehundred-eightyeight-en-blog.module').then(
      //       (m) => m.OnehundredEightyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '189', //189
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-eightynine-en-blog/onehundred-eightynine-en-blog.module').then(
      //       (m) => m.OnehundredEightynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '190', //190
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninety-en-blog/onehundred-ninety-en-blog.module').then(
      //       (m) => m.OnehundredNinetyEnBlogModule,
      //     ),
      // },
      // {
      //   path: '191', //191
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetyone-en-blog/onehundred-ninetyone-en-blog.module').then(
      //       (m) => m.OnehundredNinetyoneEnBlogModule,
      //     ),
      // },
      // {
      //   path: '192', //192
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetytwo-en-blog/onehundred-ninetytwo-en-blog.module').then(
      //       (m) => m.OnehundredNinetytwoEnBlogModule,
      //     ),
      // },
      // {
      //   path: '193', //193
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetythree-en-blog/onehundred-ninetythree-en-blog.module').then(
      //       (m) => m.OnehundredNinetythreeEnBlogModule,
      //     ),
      // },
      // {
      //   path: '194', //194
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetyfour-en-blog/onehundred-ninetyfour-en-blog.module').then(
      //       (m) => m.OnehundredNinetyfourEnBlogModule,
      //     ),
      // },
      // {
      //   path: '195', //195
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetyfive-en-blog/onehundred-ninetyfive-en-blog.module').then(
      //       (m) => m.OnehundredNinetyfiveEnBlogModule,
      //     ),
      // },
      // {
      //   path: '196', //196
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetysix-en-blog/onehundred-ninetysix-en-blog.module').then(
      //       (m) => m.OnehundredNinetysixEnBlogModule,
      //     ),
      // },
      // {
      //   path: '197', //197
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetyseven-en-blog/onehundred-ninetyseven-en-blog.module').then(
      //       (m) => m.OnehundredNinetysevenEnBlogModule,
      //     ),
      // },
      // {
      //   path: '198', //198
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetyeight-en-blog/onehundred-ninetyeight-en-blog.module').then(
      //       (m) => m.OnehundredNinetyeightEnBlogModule,
      //     ),
      // },
      // {
      //   path: '199', //199
      //   loadChildren: () =>
      //     import('../eu-blog/onehundred-ninetynine-en-blog/onehundred-ninetynine-en-blog.module').then(
      //       (m) => m.OnehundredNinetynineEnBlogModule,
      //     ),
      // },
      // {
      //   path: '200', //200
      //   loadChildren: () =>
      //     import('../eu-blog/twohundred-en-blog/twohundred-en-blog.module').then(
      //       (m) => m.TwohundredEnBlogModule,
      //     ),
      // },
    ],
  },
];

@NgModule({
  declarations: [
    EnBlogHomepageComponent,
    CoverEnComponent,
    SearchblockEnComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class EuBlogModule {}
