import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuBlogHomepageComponent } from './ru-blog-homepage/ru-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatExpansionModule } from '@angular/material/expansion';
import { CoverRuComponent } from './cover-ru/cover-ru.component';
import { SearchblockRuComponent } from '../../../searchblock/searchblock-ru/searchblock-ru.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: CoverRuComponent,
    children: [
      { path: '', component: RuBlogHomepageComponent },
      {
        path: 'freeeducation',
        loadChildren: () =>
          import('../ru-trading/fourty-five-ru-artickle/fourty-five-ru-artickle.module').then(
            (m) => m.FourtyFiveRuArtickleModule,
          ),
      }, 
      {
        path: 'about', //106
        loadChildren: () =>
          import('../ru-blog/onehundred-six-ru-blog/onehundred-six-ru-blog.module').then(
            (m) => m.OnehundredSixRuBlogModule,
          ),
      },
      {
        path: 'tradingview-record', //107
        loadChildren: () =>
          import('../ru-blog/onehundred-seven-ru-blog/onehundred-seven-ru-blog.module').then(
            (m) => m.OnehundredSevenRuBlogModule,
          ),
      },
      // {
      //   path: 'youtube', //108
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eight-ru-blog/onehundred-eight-ru-blog.module').then(
      //       (m) => m.OnehundredEightRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'curriculum', //109
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-nine-ru-blog/onehundred-nine-ru-blog.module').then(
      //       (m) => m.OnehundredNineRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'fullvideocourse', //110
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ten-ru-blog/onehundred-ten-ru-blog.module').then(
      //       (m) => m.OnehundredTenRuBlogModule,
      //     ),
      // },
      {
        path: 'practic', //64
        loadChildren: () =>
          import('../ru-blog/sixty-four-ru-blog/sixty-four-ru-blog.module').then(
            (m) => m.SixtyFourRuBlogModule,
          ),
      },
      {
        path: 'imbalance-fvg',
        loadChildren: () =>
          import('./one-ru-blog/one-ru-blog.module').then(
            (m) => m.OneRuBlogModule,
          ),
      },
      {
        path: 'liquidity-pools',
        loadChildren: () =>
          import('./two-ru-blog/two-ru-blog.module').then(
            (m) => m.TwoRuBlogModule,
          ),
      },
      {
        path: 'order-block',
        loadChildren: () =>
          import('./three-ru-blog/three-ru-blog.module').then(
            (m) => m.ThreeRuBlogModule,
          ),
      },
      {
        path: 'smart-money-guide',
        loadChildren: () =>
          import('./four-ru-blog/four-ru-blog.module').then(
            (m) => m.FourRuBlogModule,
          ),
      },
      {
        path: 'xrp-ripple',
        loadChildren: () =>
          import('./five-ru-blog/five-ru-blog.module').then(
            (m) => m.FiveRuBlogModule,
          ),
      },
      {
        path: 'bitcoin-dominance',
        loadChildren: () =>
          import('./six-ru-blog/six-ru-blog.module').then(
            (m) => m.SixRuBlogModule,
          ),
      },
      {
        path: 'bitcoin-etf',
        loadChildren: () =>
          import('./seven-ru-blog/seven-ru-blog.module').then(
            (m) => m.SevenRuBlogModule,
          ),
      },
      {
        path: 'bitcoin-guide',
        loadChildren: () =>
          import('./eight-ru-blog/eight-ru-blog.module').then(
            (m) => m.EightRuBlogModule,
          ),
      },
      {
        path: 'bitcoin-halving',
        loadChildren: () =>
          import('./nine-ru-blog/nine-ru-blog.module').then(
            (m) => m.NineRuBlogModule,
          ),
      },
      {
        path: 'crypto-arbitrage',
        loadChildren: () =>
          import('./ten-ru-blog/ten-ru-blog.module').then(
            (m) => m.TenRuBlogModule,
          ),
      },
      {
        path: 'crypto-basics', //11
        loadChildren: () =>
          import('./eleven-ru-blog/eleven-ru-blog.module').then(
            (m) => m.ElevenRuBlogModule,
          ),
      },
      // {
      //   path: 'crypto-perpetuals-margin', //12
      //   loadChildren: () =>
      //     import('./twelve-ru-blog/twelve-ru-blog.module').then(
      //       (m) => m.TwelveRuBlogModule,
      //     ),
      // },
      {
        path: 'crypto-perpetuals-margin', //13
        loadChildren: () =>
          import('./thirteen-ru-blog/thirteen-ru-blog.module').then(
            (m) => m.ThirteenRuBlogModule,
          ),
      },
      {
        path: 'crypto-risks-scams', //14
        loadChildren: () =>
          import('./fourteen-ru-blog/fourteen-ru-blog.module').then(
            (m) => m.FourteenRuBlogModule,
          ),
      },
      {
        path: 'crypto-staking', //15
        loadChildren: () =>
          import('./fiveteen-ru-blog/fiveteen-ru-blog.module').then(
            (m) => m.FiveteenRuBlogModule,
          ),
      },
      {
        path: 'ethereum-guide', //16
        loadChildren: () =>
          import('./sixteen-ru-blog/sixteen-ru-blog.module').then(
            (m) => m.SixteenRuBlogModule,
          ),
      },
      {
        path: 'memecoins', //17
        loadChildren: () =>
          import('./seventeen-ru-blog/seventeen-ru-blog.module').then(
            (m) => m.SeventeenRuBlogModule,
          ),
      },
      {
        path: 'stablecoins-tether', //18
        loadChildren: () =>
          import('./eighteen-ru-blog/eighteen-ru-blog.module').then(
            (m) => m.EighteenRuBlogModule,
          ),
      },
      {
        path: 'tokenomics', //19
        loadChildren: () =>
          import('./nineteen-ru-blog/nineteen-ru-blog.module').then(
            (m) => m.NineteenRuBlogModule,
          ),
      },
      {
        path: 'crypto-storage', //20
        loadChildren: () =>
          import('./twenty-ru-blog/twenty-ru-blog.module').then(
            (m) => m.TwentyRuBlogModule,
          ),
      },
      {
        path: 'solana-guide', //21
        loadChildren: () =>
          import('./twenty-one-ru-blog/twenty-one-ru-blog.module').then(
            (m) => m.TwentyOneRuBlogModule,
          ),
      },
      {
        path: 'defi', //22
        loadChildren: () =>
          import('./twenty-two-ru-blog/twenty-two-ru-blog.module').then(
            (m) => m.TwentyTwoRuBlogModule,
          ),
      },
      {
        path: 'volume-analysis', //23
        loadChildren: () =>
          import('./twenty-three-ru-blog/twenty-three-ru-blog.module').then(
            (m) => m.TwentyThreeRuBlogModule,
          ),
      },
      {
        path: 'wyckoff-method', //24
        loadChildren: () =>
          import('./twenty-four-ru-blog/twenty-four-ru-blog.module').then(
            (m) => m.TwentyFourRuBlogModule,
          ),
      },
      {
        path: 'averaging-martingale', //25
        loadChildren: () =>
          import('./twenty-five-ru-blog/twenty-five-ru-blog.module').then(
            (m) => m.TwentyFiveRuBlogModule,
          ),
      },
      {
        path: 'trading-psychology', //26
        loadChildren: () =>
          import('./twenty-six-ru-blog/twenty-six-ru-blog.module').then(
            (m) => m.TwentySixRuBlogModule,
          ),
      },
      {
        path: 'assets-trading', //27
        loadChildren: () =>
          import('./twenty-seven-ru-blog/twenty-seven-ru-blog.module').then(
            (m) => m.TwentySevenRuBlogModule,
          ),
      },
      {
        path: 'fundamental-analysis', //28
        loadChildren: () =>
          import('./twenty-eight-ru-blog/twenty-eight-ru-blog.module').then(
            (m) => m.TwentyEightRuBlogModule,
          ),
      },
      {
        path: 'bonds-guide', //29
        loadChildren: () =>
          import('./twenty-nine-ru-blog/twenty-nine-ru-blog.module').then(
            (m) => m.TwentyNineRuBlogModule,
          ),
      },
      {
        path: 'derivatives-futures-spot', //30
        loadChildren: () =>
          import('./thirty-ru-blog/thirty-ru-blog.module').then(
            (m) => m.ThirtyRuBlogModule,
          ),
      },
      {
        path: 'forex-guide', //31
        loadChildren: () =>
          import('./thirty-one-ru-blog/thirty-one-ru-blog.module').then(
            (m) => m.ThirtyOneRuBlogModule,
          ),
      },
      {
        path: 'how-exchange-works', //32
        loadChildren: () =>
          import('./thirty-two-ru-blog/thirty-two-ru-blog.module').then(
            (m) => m.ThirtyTwoRuBlogModule,
          ),
      },
      {
        path: 'market-microstructure', //33
        loadChildren: () =>
          import('./thirty-three-ru-blog/thirty-three-ru-blog.module').then(
            (m) => m.ThirtyThreeRuBlogModule,
          ),
      },
      {
        path: 'order-types', //34
        loadChildren: () =>
          import('./thirty-four-ru-blog/thirty-four-ru-blog.module').then(
            (m) => m.ThirtyFourRuBlogModule,
          ),
      },
      {
        path: 'trading-vs-investing', //35
        loadChildren: () =>
          import('./thirty-five-ru-blog/thirty-five-ru-blog.module').then(
            (m) => m.ThirtyFiveRuBlogModule,
          ),
      },
      {
        path: 'copy-trading', //36
        loadChildren: () =>
          import('./thirty-six-ru-blog/thirty-six-ru-blog.module').then(
            (m) => m.ThirtySixRuBlogModule,
          ),
      },
      {
        path: 'platforms-broker', //37
        loadChildren: () =>
          import('./thirty-seven-ru-blog/thirty-seven-ru-blog.module').then(
            (m) => m.ThirtySevenRuBlogModule,
          ),
      },
      {
        path: 'prop-trading', //38
        loadChildren: () =>
          import('./thirty-eight-ru-blog/thirty-eight-ru-blog.module').then(
            (m) => m.ThirtyEightRuBlogModule,
          ),
      },
      {
        path: 'risk-management', //39
        loadChildren: () =>
          import('./thirty-nine-ru-blog/thirty-nine-ru-blog.module').then(
            (m) => m.ThirtyNineRuBlogModule,
          ),
      },
      {
        path: 'trade-management', //40
        loadChildren: () =>
          import('./fourty-ru-blog/fourty-ru-blog.module').then(
            (m) => m.FourtyRuBlogModule,
          ),
      },
      {
        path: 'trading-for-beginners', //41
        loadChildren: () =>
          import('./fourty-one-ru-blog/fourty-one-ru-blog.module').then(
            (m) => m.FourtyOneRuBlogModule,
          ),
      },
      {
        path: 'trading-styles', //42
        loadChildren: () =>
          import('./fourty-two-ru-blog/fourty-two-ru-blog.module').then(
            (m) => m.FourtyTwoRuBlogModule,
          ),
      },
      {
        path: 'trading-system', //43
        loadChildren: () =>
          import('./fourty-three-ru-blog/fourty-three-ru-blog.module').then(
            (m) => m.FourtyThreeRuBlogModule,
          ),
      },
      {
        path: 'stochastic-oscillator', //44
        loadChildren: () =>
          import('./fourty-four-ru-blog/fourty-four-ru-blog.module').then(
            (m) => m.FourtyFourRuBlogModule,
          ),
      },
      {
        path: 'rsi-indicator', //45
        loadChildren: () =>
          import('./fourty-five-ru-blog/fourty-five-ru-blog.module').then(
            (m) => m.FourtyFiveRuBlogModule,
          ),
      },
      {
        path: 'moving-averages', //46
        loadChildren: () =>
          import('./fourty-six-ru-blog/fourty-six-ru-blog.module').then(
            (m) => m.FourtySixRuBlogModule,
          ),
      },
      {
        path: 'macd-indicator', //47
        loadChildren: () =>
          import('./fourty-seven-ru-blog/fourty-seven-ru-blog.module').then(
            (m) => m.FourtySevenRuBlogModule,
          ),
      },
      {
        path: 'elliott-waves', //48
        loadChildren: () =>
          import('./fourty-eight-ru-blog/fourty-eight-ru-blog.module').then(
            (m) => m.FourtyEightRuBlogModule,
          ),
      },
      {
        path: 'fibonacci-levels', //49
        loadChildren: () =>
          import('./fourty-nine-ru-blog/fourty-nine-ru-blog.module').then(
            (m) => m.FourtyNineRuBlogModule,
          ),
      },
      {
        path: 'bollinger-bands', //50
        loadChildren: () =>
          import('./fifty-ru-blog/fifty-ru-blog.module').then(
            (m) => m.FiftyRuBlogModule,
          ),
      },
      {
        path: 'atr-indicator', //51
        loadChildren: () =>
          import('./fifty-one-ru-blog/fifty-one-ru-blog.module').then(
            (m) => m.FiftyOneRuBlogModule,
          ),
      },
      {
        path: 'adx-indicator', //52
        loadChildren: () =>
          import('./fifty-two-ru-blog/fifty-two-ru-blog.module').then(
            (m) => m.FiftyTwoRuBlogModule,
          ),
      },
      {
        path: 'chart-reading', //53
        loadChildren: () =>
          import('./fifty-three-ru-blog/fifty-three-ru-blog.module').then(
            (m) => m.FiftyThreeRuBlogModule,
          ),
      },
      {
        path: 'chart-patterns', //54
        loadChildren: () =>
          import('./fifty-four-ru-blog/fifty-four-ru-blog.module').then(
            (m) => m.FiftyFourRuBlogModule,
          ),
      },
      {
        path: 'candlestick-patterns', //55
        loadChildren: () =>
          import('./fifty-five-ru-blog/fifty-five-ru-blog.module').then(
            (m) => m.FiftyFiveRuBlogModule,
          ),
      },
      {
        path: 'breakout-strategy', //56
        loadChildren: () =>
          import('./fifty-six-ru-blog/fifty-six-ru-blog.module').then(
            (m) => m.FiftySixRuBlogModule,
          ),
      },
      {
        path: 'vwap-indicator', //57
        loadChildren: () =>
          import('./fifty-seven-ru-blog/fifty-seven-ru-blog.module').then(
            (m) => m.FiftySevenRuBlogModule,
          ),
      },
      {
        path: 'ichimoku-cloud', //58
        loadChildren: () =>
          import('./fifty-eight-ru-blog/fifty-eight-ru-blog.module').then(
            (m) => m.FiftyEightRuBlogModule,
          ),
      },
      {
        path: 'ai-in-trading', //59
        loadChildren: () =>
          import('./fifty-nine-ru-blog/fifty-nine-ru-blog.module').then(
            (m) => m.FiftyNineRuBlogModule,
          ),
      },
      {
        path: 'trading-indicators', //60
        loadChildren: () =>
          import('./sixty-ru-blog/sixty-ru-blog.module').then(
            (m) => m.SixtyRuBlogModule,
          ),
      },
      // {
      //   path: 'adviceforbeginners',
      //   loadChildren: () =>
      //     import('../ru-trading/one-ru-article/one-ru-article.module').then(
      //       (m) => m.OneRUArticleModule,
      //     ),
      // },

      // {
      //   path: 'marketbasics',
      //   loadChildren: () =>
      //     import('../ru-trading/two-ru-article/two-ru-article.module').then(
      //       (m) => m.TwoRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'exchange',
      //   loadChildren: () =>
      //     import('../ru-trading/three-ru-article/three-ru-article.module').then(
      //       (m) => m.ThreeRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'exchangemarket',
      //   loadChildren: () =>
      //     import('../ru-trading/four-ru-article/four-ru-article.module').then(
      //       (m) => m.FourRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'derivatives',
      //   loadChildren: () =>
      //     import('../ru-trading/five-ru-article/five-ru-article.module').then(
      //       (m) => m.FiveRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'stablecoins',
      //   loadChildren: () =>
      //     import('../ru-trading/six-ru-article/six-ru-article.module').then(
      //       (m) => m.SixRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'forexmarket',
      //   loadChildren: () =>
      //     import('../ru-trading/seven-ru-article/seven-ru-article.module').then(
      //       (m) => m.SevenRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'currenciesandquotes',
      //   loadChildren: () =>
      //     import('../ru-trading/eight-ru-article/eight-ru-article.module').then(
      //       (m) => m.EightRuArticleModule,
      //     ),
      // },
      // {
      //   path: 'formationexchange',
      //   loadChildren: () =>
      //     import('../ru-trading/nine-ru-article/nine-ru-article.module').then(
      //       (m) => m.NineRuArticleModule,
      //     ),
      // },

      // {
      //   path: 'currencyposition',
      //   loadChildren: () =>
      //     import('../ru-trading/ten-ru-artickle/ten-ru-artickle.module').then(
      //       (m) => m.TenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'cryptostart',
      //   loadChildren: () =>
      //     import('../ru-trading/eleven-ru-artickle/eleven-ru-artickle.module').then(
      //       (m) => m.ElevenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'halving',
      //   loadChildren: () =>
      //     import('../ru-trading/twelve-ru-artickle/twelve-ru-artickle.module').then(
      //       (m) => m.TwelveRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'riskcurrencyexchange',
      //   loadChildren: () =>
      //     import('../ru-trading/thirteen-ru-artickle/thirteen-ru-artickle.module').then(
      //       (m) => m.ThirteenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'forexleveragerisk',
      //   loadChildren: () =>
      //     import('../ru-trading/fourteen-ru-artickle/fourteen-ru-artickle.module').then(
      //       (m) => m.FourteenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'majorbankfrs',
      //   loadChildren: () =>
      //     import('../ru-trading/fifteen-ru-artickle/fifteen-ru-artickle.module').then(
      //       (m) => m.FifteenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'ethereum',
      //   loadChildren: () =>
      //     import('../ru-trading/sixteen-ru-artickle/sixteen-ru-artickle.module').then(
      //       (m) => m.SixteenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'bitcoin',
      //   loadChildren: () =>
      //     import('../ru-trading/seventeen-ru-artickle/seventeen-ru-artickle.module').then(
      //       (m) => m.SeventeenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'psychorisks',
      //   loadChildren: () =>
      //     import('../ru-trading/eighteen-ru-artickle/eighteen-ru-artickle.module').then(
      //       (m) => m.EighteenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'howtotradeonforex',
      //   loadChildren: () =>
      //     import('../ru-trading/nineteen-ru-artickle/nineteen-ru-artickle.module').then(
      //       (m) => m.NineteenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'steidlmayeranalysis',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-ru-artickle/twenty-ru-artickle.module').then(
      //       (m) => m.TwentyRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'marketanalysisforex',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-one-ru-artickle/twenty-one-ru-artickle.module').then(
      //       (m) => m.TwentyOneRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'econimicfactors',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-two-ru-artickle/twenty-two-ru-artickle.module').then(
      //       (m) => m.TwentyTwoRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'worldstockindicates',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-three-ru-artickle/twenty-three-ru-artickle.module').then(
      //       (m) => m.TwentyThreeRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'fibonaccilevels',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-four-ru-artickle/twenty-four-ru-artickle.module').then(
      //       (m) => m.TwentyFourRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'keyeconomicgrowth',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-five-ru-artickle/twenty-five-ru-artickle.module').then(
      //       (m) => m.TwentyFiveRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'technicalanalysis',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-six-ru-artickle/twenty-six-ru-artickle.module').then(
      //       (m) => m.TwentySixRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'technicalmarketcharts',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-seven-ru-artickle/twenty-seven-ru-artickle.module').then(
      //       (m) => m.TwentySevenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'keypricepattern',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-eight-ru-artickle/twenty-eight-ru-artickle.module').then(
      //       (m) => m.TwentyEightRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'smartmonettraps',
      //   loadChildren: () =>
      //     import('../ru-trading/twenty-nine-ru-artickle/twenty-nine-ru-artickle.module').then(
      //       (m) => m.TwentyNineRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'imbalanceandfvg',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-ru-artickle/thirty-ru-artickle.module').then(
      //       (m) => m.ThirtyRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'marketorder',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-one-ru-artickle/thirty-one-ru-artickle.module').then(
      //       (m) => m.ThirtyOneRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stoporder',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-two-ru-artickle/thirty-two-ru-artickle.module').then(
      //       (m) => m.ThirtyTwoRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'requotes',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-three-ru-artickle/thirty-three-ru-artickle.module').then(
      //       (m) => m.ThirtyThreeRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stoplimitorder',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-four-ru-artickle/thirty-four-ru-artickle.module').then(
      //       (m) => m.ThirtyFourRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'tradingsystem',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-five-ru-artickle/thirty-five-ru-artickle.module').then(
      //       (m) => m.ThirtyFiveRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'falsebreakouts',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-six-ru-artickle/thirty-six-ru-artickle.module').then(
      //       (m) => m.ThirtySixRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stophunting',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-seven-ru-artickle/thirty-seven-ru-artickle.module').then(
      //       (m) => m.ThirtySevenRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'capitalmanagement',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-eight-ru-artickle/thirty-eight-ru-artickle.module').then(
      //       (m) => m.ThirtyEightRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'profitandlossratio',
      //   loadChildren: () =>
      //     import('../ru-trading/thirty-nine-ru-artickle/thirty-nine-ru-artickle.module').then(
      //       (m) => m.ThirtyNineRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'beginnermistakes',
      //   loadChildren: () =>
      //     import('../ru-trading/fourty-ru-artickle/fourty-ru-artickle.module').then(
      //       (m) => m.FourtyRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'tradingplan',
      //   loadChildren: () =>
      //     import('../ru-trading/fourty-one-ru-artickle/fourty-one-ru-artickle.module').then(
      //       (m) => m.FourtyOneRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'timeframes',
      //   loadChildren: () =>
      //     import('../ru-trading/fourty-two-ru-artickle/fourty-two-ru-artickle.module').then(
      //       (m) => m.FourtyTwoRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'liquiditypools',
      //   loadChildren: () =>
      //     import('../ru-trading/fourty-three-ru-artickle/fourty-three-ru-artickle.module').then(
      //       (m) => m.FourtyThreeRuArtickleModule,
      //     ),
      // },
      // {
      //   path: 'icebergorders',
      //   loadChildren: () =>
      //     import('../ru-trading/fourty-four-ru-artickle/fourty-four-ru-artickle.module').then(
      //       (m) => m.FourtyFourRuArtickleModule,
      //     ),
      // },

      // {
      //   path: 'cryptotether',
      //   loadChildren: () =>
      //     import('../ru-trading/fourty-six-ru-artickle/fourty-six-ru-artickle.module').then(
      //       (m) => m.FourtySixRuArtickleModule,
      //     ),
      // },

      // {
      //   path: 'smartmoneyconceptsguide', //61
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-one-ru-blog/sixty-one-ru-blog.module').then(
      //       (m) => m.SixtyOneRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneystrategies', //62
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-two-ru-blog/sixty-two-ru-blog.module').then(
      //       (m) => m.SixtyTwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneycontrol', //63
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-three-ru-blog/sixty-three-ru-blog.module').then(
      //       (m) => m.SixtyThreeRuBlogModule,
      //     ),
      // },
      
      // {
      //   path: 'stockorderbook', //65
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-five-ru-blog/sixty-five-ru-blog.module').then(
      //       (m) => m.SixtyFiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'peakvolumelevels', //66
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-six-ru-blog/sixty-six-ru-blog.module').then(
      //       (m) => m.SixtySixRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'trendvolumeanalysis', //67
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-seven-ru-blog/sixty-seven-ru-blog.module').then(
      //       (m) => m.SixtySevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'marketauctiondevelops', //68
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-eight-ru-blog/sixty-eight-ru-blog.module').then(
      //       (m) => m.SixtyEightRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'volumeandfuturesmarket', //69
      //   loadChildren: () =>
      //     import('../ru-blog/sixty-nine-ru-blog/sixty-nine-ru-blog.module').then(
      //       (m) => m.SixtyNineRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'wyckoffsvolumeconcept', //70
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-ru-blog/seventy-ru-blog.module').then(
      //       (m) => m.SeventyRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'newstrading', //71
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-one-ru-blog/seventy-one-ru-blog.module').then(
      //       (m) => m.SeventyOneRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'economiccalendar', //72
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-two-ru-blog/seventy-two-ru-blog.module').then(
      //       (m) => m.SeventyTwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'macroeconomicindicators', //73
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-three-ru-blog/seventy-three-ru-blog.module').then(
      //       (m) => m.SeventyThreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'globalfundamentalanalysis', //74
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-four-ru-blog/seventy-four-ru-blog.module').then(
      //       (m) => m.SeventyFourRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'gamblingorbusiness', //75
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-five-ru-blog/seventy-five-ru-blog.module').then(
      //       (m) => m.SeventyFiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'williamgannpsychology', //76
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-six-ru-blog/seventy-six-ru-blog.module').then(
      //       (m) => m.SeventySixRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'emotionsaffect', //77
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-seven-ru-blog/seventy-seven-ru-blog.module').then(
      //       (m) => m.SeventySevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'fomo', //78
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-eight-ru-blog/seventy-eight-ru-blog.module').then(
      //       (m) => m.SeventyEightRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'psychologyofaveraging', //79
      //   loadChildren: () =>
      //     import('../ru-blog/seventy-nine-ru-blog/seventy-nine-ru-blog.module').then(
      //       (m) => m.SeventyNineRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'headandshoulders', //80
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-ru-blog/eighty-ru-blog.module').then(
      //       (m) => m.EightyRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'trianglefigure', //81
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-one-ru-blog/eighty-one-ru-blog.module').then(
      //       (m) => m.EightyOneRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'flagandpennant', //82
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-two-ru-blog/eighty-two-ru-blog.module').then(
      //       (m) => m.EightyTwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'cupandhandle', //83
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-three-ru-blog/eighty-three-ru-blog.module').then(
      //       (m) => m.EightyThreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'engulfing', //84
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-four-ru-blog/eighty-four-ru-blog.module').then(
      //       (m) => m.EightyFourRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'doubletopandbottom', //85
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-five-ru-blog/eighty-five-ru-blog.module').then(
      //       (m) => m.EightyFiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'pattern-1-2-3', //86
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-six-ru-blog/eighty-six-ru-blog.module').then(
      //       (m) => m.EightySixRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'copytrading', //87
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-seven-ru-blog/eighty-seven-ru-blog.module').then(
      //       (m) => m.EightySevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'tradingview-platform', //88
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-eight-ru-blog/eighty-eight-ru-blog.module').then(
      //       (m) => m.EightyEightRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'bitcoin-domination', //89
      //   loadChildren: () =>
      //     import('../ru-blog/eighty-nine-ru-blog/eighty-nine-ru-blog.module').then(
      //       (m) => m.EightyNineRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'metodmartingejla', //90
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-ru-blog/ninty-ru-blog.module').then(
      //       (m) => m.NintyRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'tiltintrading', //91
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-one-ru-blog/ninty-one-ru-blog.module').then(
      //       (m) => m.NintyOneRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'binarnyeopciony', //92
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-two-ru-blog/ninty-two-ru-blog.module').then(
      //       (m) => m.NintyTwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'atrindikator', //93
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-three-ru-blog/ninty-three-ru-blog.module').then(
      //       (m) => m.NintyThreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'spread', //94
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-four-ru-blog/ninty-four-ru-blog.module').then(
      //       (m) => m.NintyFourRuBlogModule,
      //     ),
      // },

      // {
      //   path: 'goldtrading', //95
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-five-ru-blog/ninty-five-ru-blog.module').then(
      //       (m) => m.NintyFiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'oiltrading', //96
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-six-ru-blog/ninty-six-ru-blog.module').then(
      //       (m) => m.NintySixRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'rsiindicator', //97
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-seven-ru-blog/ninty-seven-ru-blog.module').then(
      //       (m) => m.NintySevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'stochastic', //98
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-eight-ru-blog/ninty-eight-ru-blog.module').then(
      //       (m) => m.NintyEightRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'macdindicator', //99
      //   loadChildren: () =>
      //     import('../ru-blog/ninty-nine-ru-blog/ninty-nine-ru-blog.module').then(
      //       (m) => m.NintyNineRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'sp500trading', //100
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ru-blog/onehundred-ru-blog.module').then(
      //       (m) => m.OnehundredRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'vwap', //101
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-one-ru-blog/onehundred-one-ru-blog.module').then(
      //       (m) => m.OnehundredOneRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'bollingerbands', //102
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-two-ru-blog/onehundred-two-ru-blog.module').then(
      //       (m) => m.OnehundredTwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'ichimoku', //103
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-three-ru-blog/onehundred-three-ru-blog.module').then(
      //       (m) => m.OnehundredThreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'solana', //104
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-four-ru-blog/onehundred-four-ru-blog.module').then(
      //       (m) => m.OnehundredFourRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'xrp', //105
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-five-ru-blog/onehundred-five-ru-blog.module').then(
      //       (m) => m.OnehundredFiveRuBlogModule,
      //     ),
      // },

      // {
      //   path: 'bitcoin-crash-stops', //111
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eleven-ru-blog/onehundred-eleven-ru-blog.module').then(
      //       (m) => m.OnehundredElevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'adx', //112
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twelve-ru-blog/onehundred-twelve-ru-blog.module').then(
      //       (m) => m.OnehundredTwelveRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'ai-trading', //113
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirteen-ru-blog/onehundred-thirteen-ru-blog.module').then(
      //       (m) => m.OnehundredThirteenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'airdrop', //114
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fourteen-ru-blog/onehundred-fourteen-ru-blog.module').then(
      //       (m) => m.OnehundredFourteenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'altseason', //115
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fifteen-ru-blog/onehundred-fifteen-ru-blog.module').then(
      //       (m) => m.OnehundredFifteenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'backtest', //116
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixteen-ru-blog/onehundred-sixteen-ru-blog.module').then(
      //       (m) => m.OnehundredSixteenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'bonds-coupon-yield', //117
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventeen-ru-blog/onehundred-seventeen-ru-blog.module').then(
      //       (m) => m.OnehundredSeventeenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'breaker-mitigation-blocks', //118
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eighteen-ru-blog/onehundred-eighteen-ru-blog.module').then(
      //       (m) => m.OnehundredEighteenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'breakeven', //119
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-nineteen-ru-blog/onehundred-nineteen-ru-blog.module').then(
      //       (m) => m.OnehundredNineteenRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'bull-bear-market', //120
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twenty-ru-blog/onehundred-twenty-ru-blog.module').then(
      //       (m) => m.OnehundredTwentyRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'can-ai-predict-price', //121
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentyone-ru-blog/onehundred-twentyone-ru-blog.module').then(
      //       (m) => m.OnehundredTwentyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'candle-hammer-doji-star', //122
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentytwo-ru-blog/onehundred-twentytwo-ru-blog.module').then(
      //       (m) => m.OnehundredTwentytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: 'carrytrade', //123
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentythree-ru-blog/onehundred-twentythree-ru-blog.module').then(
      //       (m) => m.OnehundredTwentythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '124', //124
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentyfour-ru-blog/onehundred-twentyfour-ru-blog.module').then(
      //       (m) => m.OnehundredTwentyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '125', //125
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentyfive-ru-blog/onehundred-twentyfive-ru-blog.module').then(
      //       (m) => m.OnehundredTwentyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '126', //126
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentysix-ru-blog/onehundred-twentysix-ru-blog.module').then(
      //       (m) => m.OnehundredTwentysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '127', //127
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentyseven-ru-blog/onehundred-twentyseven-ru-blog.module').then(
      //       (m) => m.OnehundredTwentysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '128', //128
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentyeight-ru-blog/onehundred-twentyeight-ru-blog.module').then(
      //       (m) => m.OnehundredTwentyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '129', //129
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-twentynine-ru-blog/onehundred-twentynine-ru-blog.module').then(
      //       (m) => m.OnehundredTwentynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '130', //130
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirty-ru-blog/onehundred-thirty-ru-blog.module').then(
      //       (m) => m.OnehundredThirtyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '131', //131
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtyone-ru-blog/onehundred-thirtyone-ru-blog.module').then(
      //       (m) => m.OnehundredThirtyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '132', //132
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtytwo-ru-blog/onehundred-thirtytwo-ru-blog.module').then(
      //       (m) => m.OnehundredThirtytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '133', //133
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtythree-ru-blog/onehundred-thirtythree-ru-blog.module').then(
      //       (m) => m.OnehundredThirtythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '134', //134
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtyfour-ru-blog/onehundred-thirtyfour-ru-blog.module').then(
      //       (m) => m.OnehundredThirtyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '135', //135
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtyfive-ru-blog/onehundred-thirtyfive-ru-blog.module').then(
      //       (m) => m.OnehundredThirtyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '136', //136
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtysix-ru-blog/onehundred-thirtysix-ru-blog.module').then(
      //       (m) => m.OnehundredThirtysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '137', //137
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtyseven-ru-blog/onehundred-thirtyseven-ru-blog.module').then(
      //       (m) => m.OnehundredThirtysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '138', //138
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtyeight-ru-blog/onehundred-thirtyeight-ru-blog.module').then(
      //       (m) => m.OnehundredThirtyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '139', //139
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-thirtynine-ru-blog/onehundred-thirtynine-ru-blog.module').then(
      //       (m) => m.OnehundredThirtynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '140', //140
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-forty-ru-blog/onehundred-forty-ru-blog.module').then(
      //       (m) => m.OnehundredFortyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '141', //141
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortyone-ru-blog/onehundred-fortyone-ru-blog.module').then(
      //       (m) => m.OnehundredFortyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '142', //142
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortytwo-ru-blog/onehundred-fortytwo-ru-blog.module').then(
      //       (m) => m.OnehundredFortytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '143', //143
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortythree-ru-blog/onehundred-fortythree-ru-blog.module').then(
      //       (m) => m.OnehundredFortythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '144', //144
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortyfour-ru-blog/onehundred-fortyfour-ru-blog.module').then(
      //       (m) => m.OnehundredFortyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '145', //145
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortyfive-ru-blog/onehundred-fortyfive-ru-blog.module').then(
      //       (m) => m.OnehundredFortyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '146', //146
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortysix-ru-blog/onehundred-fortysix-ru-blog.module').then(
      //       (m) => m.OnehundredFortysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '147', //147
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortyseven-ru-blog/onehundred-fortyseven-ru-blog.module').then(
      //       (m) => m.OnehundredFortysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '148', //148
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortyeight-ru-blog/onehundred-fortyeight-ru-blog.module').then(
      //       (m) => m.OnehundredFortyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '149', //149
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fortynine-ru-blog/onehundred-fortynine-ru-blog.module').then(
      //       (m) => m.OnehundredFortynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '150', //150
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fifty-ru-blog/onehundred-fifty-ru-blog.module').then(
      //       (m) => m.OnehundredFiftyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '151', //151
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftyone-ru-blog/onehundred-fiftyone-ru-blog.module').then(
      //       (m) => m.OnehundredFiftyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '152', //152
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftytwo-ru-blog/onehundred-fiftytwo-ru-blog.module').then(
      //       (m) => m.OnehundredFiftytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '153', //153
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftythree-ru-blog/onehundred-fiftythree-ru-blog.module').then(
      //       (m) => m.OnehundredFiftythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '154', //154
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftyfour-ru-blog/onehundred-fiftyfour-ru-blog.module').then(
      //       (m) => m.OnehundredFiftyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '155', //155
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftyfive-ru-blog/onehundred-fiftyfive-ru-blog.module').then(
      //       (m) => m.OnehundredFiftyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '156', //156
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftysix-ru-blog/onehundred-fiftysix-ru-blog.module').then(
      //       (m) => m.OnehundredFiftysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '157', //157
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftyseven-ru-blog/onehundred-fiftyseven-ru-blog.module').then(
      //       (m) => m.OnehundredFiftysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '158', //158
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftyeight-ru-blog/onehundred-fiftyeight-ru-blog.module').then(
      //       (m) => m.OnehundredFiftyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '159', //159
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-fiftynine-ru-blog/onehundred-fiftynine-ru-blog.module').then(
      //       (m) => m.OnehundredFiftynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '160', //160
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixty-ru-blog/onehundred-sixty-ru-blog.module').then(
      //       (m) => m.OnehundredSixtyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '161', //161
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtyone-ru-blog/onehundred-sixtyone-ru-blog.module').then(
      //       (m) => m.OnehundredSixtyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '162', //162
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtytwo-ru-blog/onehundred-sixtytwo-ru-blog.module').then(
      //       (m) => m.OnehundredSixtytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '163', //163
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtythree-ru-blog/onehundred-sixtythree-ru-blog.module').then(
      //       (m) => m.OnehundredSixtythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '164', //164
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtyfour-ru-blog/onehundred-sixtyfour-ru-blog.module').then(
      //       (m) => m.OnehundredSixtyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '165', //165
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtyfive-ru-blog/onehundred-sixtyfive-ru-blog.module').then(
      //       (m) => m.OnehundredSixtyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '166', //166
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtysix-ru-blog/onehundred-sixtysix-ru-blog.module').then(
      //       (m) => m.OnehundredSixtysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '167', //167
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtyseven-ru-blog/onehundred-sixtyseven-ru-blog.module').then(
      //       (m) => m.OnehundredSixtysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '168', //168
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtyeight-ru-blog/onehundred-sixtyeight-ru-blog.module').then(
      //       (m) => m.OnehundredSixtyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '169', //169
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-sixtynine-ru-blog/onehundred-sixtynine-ru-blog.module').then(
      //       (m) => m.OnehundredSixtynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '170', //170
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventy-ru-blog/onehundred-seventy-ru-blog.module').then(
      //       (m) => m.OnehundredSeventyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '171', //171
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventyone-ru-blog/onehundred-seventyone-ru-blog.module').then(
      //       (m) => m.OnehundredSeventyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '172', //172
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventytwo-ru-blog/onehundred-seventytwo-ru-blog.module').then(
      //       (m) => m.OnehundredSeventytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '173', //173
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventythree-ru-blog/onehundred-seventythree-ru-blog.module').then(
      //       (m) => m.OnehundredSeventythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '174', //174
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventyfour-ru-blog/onehundred-seventyfour-ru-blog.module').then(
      //       (m) => m.OnehundredSeventyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '175', //175
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventyfive-ru-blog/onehundred-seventyfive-ru-blog.module').then(
      //       (m) => m.OnehundredSeventyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '176', //176
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventysix-ru-blog/onehundred-seventysix-ru-blog.module').then(
      //       (m) => m.OnehundredSeventysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '177', //177
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventyseven-ru-blog/onehundred-seventyseven-ru-blog.module').then(
      //       (m) => m.OnehundredSeventysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '178', //178
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventyeight-ru-blog/onehundred-seventyeight-ru-blog.module').then(
      //       (m) => m.OnehundredSeventyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '179', //179
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-seventynine-ru-blog/onehundred-seventynine-ru-blog.module').then(
      //       (m) => m.OnehundredSeventynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '180', //180
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eighty-ru-blog/onehundred-eighty-ru-blog.module').then(
      //       (m) => m.OnehundredEightyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '181', //181
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightyone-ru-blog/onehundred-eightyone-ru-blog.module').then(
      //       (m) => m.OnehundredEightyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '182', //182
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightytwo-ru-blog/onehundred-eightytwo-ru-blog.module').then(
      //       (m) => m.OnehundredEightytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '183', //183
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightythree-ru-blog/onehundred-eightythree-ru-blog.module').then(
      //       (m) => m.OnehundredEightythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '184', //184
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightyfour-ru-blog/onehundred-eightyfour-ru-blog.module').then(
      //       (m) => m.OnehundredEightyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '185', //185
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightyfive-ru-blog/onehundred-eightyfive-ru-blog.module').then(
      //       (m) => m.OnehundredEightyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '186', //186
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightysix-ru-blog/onehundred-eightysix-ru-blog.module').then(
      //       (m) => m.OnehundredEightysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '187', //187
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightyseven-ru-blog/onehundred-eightyseven-ru-blog.module').then(
      //       (m) => m.OnehundredEightysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '188', //188
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightyeight-ru-blog/onehundred-eightyeight-ru-blog.module').then(
      //       (m) => m.OnehundredEightyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '189', //189
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-eightynine-ru-blog/onehundred-eightynine-ru-blog.module').then(
      //       (m) => m.OnehundredEightynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '190', //190
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninety-ru-blog/onehundred-ninety-ru-blog.module').then(
      //       (m) => m.OnehundredNinetyRuBlogModule,
      //     ),
      // },
      // {
      //   path: '191', //191
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetyone-ru-blog/onehundred-ninetyone-ru-blog.module').then(
      //       (m) => m.OnehundredNinetyoneRuBlogModule,
      //     ),
      // },
      // {
      //   path: '192', //192
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetytwo-ru-blog/onehundred-ninetytwo-ru-blog.module').then(
      //       (m) => m.OnehundredNinetytwoRuBlogModule,
      //     ),
      // },
      // {
      //   path: '193', //193
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetythree-ru-blog/onehundred-ninetythree-ru-blog.module').then(
      //       (m) => m.OnehundredNinetythreeRuBlogModule,
      //     ),
      // },
      // {
      //   path: '194', //194
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetyfour-ru-blog/onehundred-ninetyfour-ru-blog.module').then(
      //       (m) => m.OnehundredNinetyfourRuBlogModule,
      //     ),
      // },
      // {
      //   path: '195', //195
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetyfive-ru-blog/onehundred-ninetyfive-ru-blog.module').then(
      //       (m) => m.OnehundredNinetyfiveRuBlogModule,
      //     ),
      // },
      // {
      //   path: '196', //196
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetysix-ru-blog/onehundred-ninetysix-ru-blog.module').then(
      //       (m) => m.OnehundredNinetysixRuBlogModule,
      //     ),
      // },
      // {
      //   path: '197', //197
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetyseven-ru-blog/onehundred-ninetyseven-ru-blog.module').then(
      //       (m) => m.OnehundredNinetysevenRuBlogModule,
      //     ),
      // },
      // {
      //   path: '198', //198
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetyeight-ru-blog/onehundred-ninetyeight-ru-blog.module').then(
      //       (m) => m.OnehundredNinetyeightRuBlogModule,
      //     ),
      // },
      // {
      //   path: '199', //199
      //   loadChildren: () =>
      //     import('../ru-blog/onehundred-ninetynine-ru-blog/onehundred-ninetynine-ru-blog.module').then(
      //       (m) => m.OnehundredNinetynineRuBlogModule,
      //     ),
      // },
      // {
      //   path: '200', //200
      //   loadChildren: () =>
      //     import('../ru-blog/twohundred-ru-blog/twohundred-ru-blog.module').then(
      //       (m) => m.TwohundredRuBlogModule,
      //     ),
      // },
    ],
  },
];

@NgModule({
  declarations: [
    RuBlogHomepageComponent,
    CoverRuComponent,
    SearchblockRuComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
})
export class RuBlogModule {}
