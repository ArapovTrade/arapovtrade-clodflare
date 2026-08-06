import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkBlogHomepageComponent } from './uk-blog-homepage/uk-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoverComponent } from './cover/cover.component';
import { SearchblockComponent } from '../../../searchblock/searchblock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CoverComponent,
    children: [
      { path: '', component: UkBlogHomepageComponent },
      {
        path: 'freeeducation', //45
        loadChildren: () =>
          import('../uk-trading/fourty-five-uk-artickle/fourty-five-uk-artickle.module').then(
            (m) => m.FourtyFiveUkArtickleModule,
          ),
      },
      {
        path: 'about', //106
        loadChildren: () =>
          import('../ukblog/onehundred-six-uk-blog/onehundred-six-uk-blog.module').then(
            (m) => m.OnehundredSixUkBlogModule,
          ),
      },
      {
        path: 'tradingview-record', //107
        loadChildren: () =>
          import('../ukblog/onehundred-seven-uk-blog/onehundred-seven-uk-blog.module').then(
            (m) => m.OnehundredSevenUkBlogModule,
          ),
      },
      // {
      //   path: 'youtube', //108
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-eight-uk-blog/onehundred-eight-uk-blog.module').then(
      //       (m) => m.OnehundredEightUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'curriculum', //109
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-nine-uk-blog/onehundred-nine-uk-blog.module').then(
      //       (m) => m.OnehundredNineUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'fullvideocourse', //110
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-ten-uk-blog/onehundred-ten-uk-blog.module').then(
      //       (m) => m.OnehundredTenUkBlogModule,
      //     ),
      // },
       {
        path: 'practic', //64
        loadChildren: () =>
          import('../ukblog/sixty-four-uk-blog/sixty-four-uk-blog.module').then(
            (m) => m.SixtyFourUkBlogModule,
          ),
      },
      {
        path: 'imbalance-fvg', //1
        loadChildren: () =>
          import('./one-uk-blog/one-uk-blog.module').then(
            (m) => m.OneUkBlogModule,
          ),
      },
      {
        path: 'liquidity-pools', //2
        loadChildren: () =>
          import('./two-uk-blog/two-uk-blog.module').then(
            (m) => m.TwoUkBlogModule,
          ),
      },
      {
        path: 'order-block', //3
        loadChildren: () =>
          import('./three-uk-blog/three-uk-blog.module').then(
            (m) => m.ThreeUkBlogModule,
          ),
      },
      {
        path: 'smart-money-guide', //4
        loadChildren: () =>
          import('./four-uk-blog/four-uk-blog.module').then(
            (m) => m.FourUkBlogModule,
          ),
      },
      {
        path: 'xrp-ripple', //5
        loadChildren: () =>
          import('./five-uk-blog/five-uk-blog.module').then(
            (m) => m.FiveUkBlogModule,
          ),
      },
      {
        path: 'bitcoin-dominance', //6
        loadChildren: () =>
          import('./six-uk-blog/six-uk-blog.module').then(
            (m) => m.SixUkBlogModule,
          ),
      },
      {
        path: 'bitcoin-etf', //7
        loadChildren: () =>
          import('./seven-uk-blog/seven-uk-blog.module').then(
            (m) => m.SevenUkBlogModule,
          ),
      },
      {
        path: 'bitcoin-guide', //8
        loadChildren: () =>
          import('./eight-uk-blog/eight-uk-blog.module').then(
            (m) => m.EightUkBlogModule,
          ),
      },
      {
        path: 'bitcoin-halving', //9
        loadChildren: () =>
          import('./nine-uk-blog/nine-uk-blog.module').then(
            (m) => m.NineUkBlogModule,
          ),
      },
      {
        path: 'crypto-arbitrage', //10
        loadChildren: () =>
          import('./ten-uk-blog/ten-uk-blog.module').then(
            (m) => m.TenUkBlogModule,
          ),
      },
      {
        path: 'crypto-basics', //11
        loadChildren: () =>
          import('./eleven-uk-blog/eleven-uk-blog.module').then(
            (m) => m.ElevenUkBlogModule,
          ),
      },
      // {
      //   path: 'crypto-perpetuals-margin', //12
      //   loadChildren: () =>
      //     import('./twelve-uk-blog/twelve-uk-blog.module').then(
      //       (m) => m.TwelveUkBlogModule,
      //     ),
      // },
      {
        path: 'crypto-perpetuals-margin', //13
        loadChildren: () =>
          import('./thirteen-uk-blog/thirteen-uk-blog.module').then(
            (m) => m.ThirteenUkBlogModule,
          ),
      },
      {
        path: 'crypto-risks-scams', //14
        loadChildren: () =>
          import('./fourteen-uk-blog/fourteen-uk-blog.module').then(
            (m) => m.FourteenUkBlogModule,
          ),
      },
      {
        path: 'crypto-staking', //15
        loadChildren: () =>
          import('./fiveteen-uk-blog/fiveteen-uk-blog.module').then(
            (m) => m.FiveteenUkBlogModule,
          ),
      },
      {
        path: 'ethereum-guide', //16
        loadChildren: () =>
          import('./sixteen-uk-blog/sixteen-uk-blog.module').then(
            (m) => m.SixteenUkBlogModule,
          ),
      },
      {
        path: 'memecoins', //17
        loadChildren: () =>
          import('./seventeen-uk-blog/seventeen-uk-blog.module').then(
            (m) => m.SeventeenUkBlogModule,
          ),
      },
      {
        path: 'stablecoins-tether', //18
        loadChildren: () =>
          import('./eighteen-uk-blog/eighteen-uk-blog.module').then(
            (m) => m.EighteenUkBlogModule,
          ),
      },
      {
        path: 'tokenomics', //19
        loadChildren: () =>
          import('./nineteen-uk-blog/nineteen-uk-blog.module').then(
            (m) => m.NineteenUkBlogModule,
          ),
      },
      {
        path: 'crypto-storage', //20
        loadChildren: () =>
          import('./twenty-uk-blog/twenty-uk-blog.module').then(
            (m) => m.TwentyUkBlogModule,
          ),
      },
      {
        path: 'solana-guide', //21
        loadChildren: () =>
          import('./twenty-one-uk-blog/twenty-one-uk-blog.module').then(
            (m) => m.TwentyOneUkBlogModule,
          ),
      },
      {
        path: 'defi', //22
        loadChildren: () =>
          import('./twenty-two-uk-blog/twenty-two-uk-blog.module').then(
            (m) => m.TwentyTwoUkBlogModule,
          ),
      },
      {
        path: 'volume-analysis', //23
        loadChildren: () =>
          import('./twenty-three-uk-blog/twenty-three-uk-blog.module').then(
            (m) => m.TwentyThreeUkBlogModule,
          ),
      },
      {
        path: 'wyckoff-method', //24
        loadChildren: () =>
          import('./twenty-four-uk-blog/twenty-four-uk-blog.module').then(
            (m) => m.TwentyFourUkBlogModule,
          ),
      },
      {
        path: 'averaging-martingale', //25
        loadChildren: () =>
          import('./twenty-five-uk-blog/twenty-five-uk-blog.module').then(
            (m) => m.TwentyFiveUkBlogModule,
          ),
      },
      {
        path: 'trading-psychology', //26
        loadChildren: () =>
          import('./twenty-six-uk-blog/twenty-six-uk-blog.module').then(
            (m) => m.TwentySixUkBlogModule,
          ),
      },
      {
        path: 'assets-trading', //27
        loadChildren: () =>
          import('./twenty-seven-uk-blog/twenty-seven-uk-blog.module').then(
            (m) => m.TwentySevenUkBlogModule,
          ),
      },
      {
        path: 'fundamental-analysis', //28
        loadChildren: () =>
          import('./twenty-eight-uk-blog/twenty-eight-uk-blog.module').then(
            (m) => m.TwentyEightUkBlogModule,
          ),
      },
      {
        path: 'bonds-guide', //29
        loadChildren: () =>
          import('./twenty-nine-uk-blog/twenty-nine-uk-blog.module').then(
            (m) => m.TwentyNineUkBlogModule,
          ),
      },
      {
        path: 'derivatives-futures-spot', //30
        loadChildren: () =>
          import('./thirty-uk-blog/thirty-uk-blog.module').then(
            (m) => m.ThirtyUkBlogModule,
          ),
      },
      {
        path: 'forex-guide', //31
        loadChildren: () =>
          import('./thirty-one-uk-blog/thirty-one-uk-blog.module').then(
            (m) => m.ThirtyOneUkBlogModule,
          ),
      },
      {
        path: 'how-exchange-works', //32
        loadChildren: () =>
          import('./thirty-two-uk-blog/thirty-two-uk-blog.module').then(
            (m) => m.ThirtyTwoUkBlogModule,
          ),
      },
      {
        path: 'market-microstructure', //33
        loadChildren: () =>
          import('./thirty-three-uk-blog/thirty-three-uk-blog.module').then(
            (m) => m.ThirtyThreeUkBlogModule,
          ),
      },
      {
        path: 'order-types', //34
        loadChildren: () =>
          import('./thirty-four-uk-blog/thirty-four-uk-blog.module').then(
            (m) => m.ThirtyFourUkBlogModule,
          ),
      },
      {
        path: 'trading-vs-investing', //35
        loadChildren: () =>
          import('./thirty-five-uk-blog/thirty-five-uk-blog.module').then(
            (m) => m.ThirtyFiveUkBlogModule,
          ),
      },
      {
        path: 'copy-trading', //36
        loadChildren: () =>
          import('./thirty-six-uk-blog/thirty-six-uk-blog.module').then(
            (m) => m.ThirtySixUkBlogModule,
          ),
      },
      {
        path: 'platforms-broker', //37
        loadChildren: () =>
          import('./thirty-seven-uk-blog/thirty-seven-uk-blog.module').then(
            (m) => m.ThirtySevenUkBlogModule,
          ),
      },
      {
        path: 'prop-trading', //38
        loadChildren: () =>
          import('./thirty-eight-uk-blog/thirty-eight-uk-blog.module').then(
            (m) => m.ThirtyEightUkBlogModule,
          ),
      },
      {
        path: 'risk-management', //39
        loadChildren: () =>
          import('./thirty-nine-uk-blog/thirty-nine-uk-blog.module').then(
            (m) => m.ThirtyNineUkBlogModule,
          ),
      },
      {
        path: 'trade-management', //40
        loadChildren: () =>
          import('./fourty-uk-blog/fourty-uk-blog.module').then(
            (m) => m.FourtyUkBlogModule,
          ),
      },
      {
        path: 'trading-for-beginners', //41
        loadChildren: () =>
          import('./fourty-one-uk-blog/fourty-one-uk-blog.module').then(
            (m) => m.FourtyOneUkBlogModule,
          ),
      },
      {
        path: 'trading-styles', //42
        loadChildren: () =>
          import('./fourty-two-uk-blog/fourty-two-uk-blog.module').then(
            (m) => m.FourtyTwoUkBlogModule,
          ),
      },
      {
        path: 'trading-system', //43
        loadChildren: () =>
          import('./fourty-three-uk-blog/fourty-three-uk-blog.module').then(
            (m) => m.FourtyThreeUkBlogModule,
          ),
      },
      {
        path: 'stochastic-oscillator', //44
        loadChildren: () =>
          import('./fourty-four-uk-blog/fourty-four-uk-blog.module').then(
            (m) => m.FourtyFourUkBlogModule,
          ),
      },
      {
        path: 'rsi-indicator', //45
        loadChildren: () =>
          import('./fourty-five-uk-blog/fourty-five-uk-blog.module').then(
            (m) => m.FourtyFiveUkBlogModule,
          ),
      },
      {
        path: 'moving-averages', //46
        loadChildren: () =>
          import('./fourty-six-uk-blog/fourty-six-uk-blog.module').then(
            (m) => m.FourtySixUkBlogModule,
          ),
      },
      {
        path: 'macd-indicator', //47
        loadChildren: () =>
          import('./fourty-seven-uk-blog/fourty-seven-uk-blog.module').then(
            (m) => m.FourtySevenUkBlogModule,
          ),
      },
      {
        path: 'elliott-waves', //48
        loadChildren: () =>
          import('./fourty-eight-uk-blog/fourty-eight-uk-blog.module').then(
            (m) => m.FourtyEightUkBlogModule,
          ),
      },
      {
        path: 'fibonacci-levels', //49
        loadChildren: () =>
          import('./fourty-nine-uk-blog/fourty-nine-uk-blog.module').then(
            (m) => m.FourtyNineUkBlogModule,
          ),
      },
      {
        path: 'bollinger-bands', //50
        loadChildren: () =>
          import('./fifty-uk-blog/fifty-uk-blog.module').then(
            (m) => m.FiftyUkBlogModule,
          ),
      },
      {
        path: 'atr-indicator', //51
        loadChildren: () =>
          import('./fifty-one-uk-blog/fifty-one-uk-blog.module').then(
            (m) => m.FiftyOneUkBlogModule,
          ),
      },
      {
        path: 'adx-indicator', //52
        loadChildren: () =>
          import('./fifty-two-uk-blog/fifty-two-uk-blog.module').then(
            (m) => m.FiftyTwoUkBlogModule,
          ),
      },
      {
        path: 'chart-reading', //53
        loadChildren: () =>
          import('./fifty-three-uk-blog/fifty-three-uk-blog.module').then(
            (m) => m.FiftyThreeUkBlogModule,
          ),
      },
      {
        path: 'chart-patterns', //54
        loadChildren: () =>
          import('./fifty-four-uk-blog/fifty-four-uk-blog.module').then(
            (m) => m.FiftyFourUkBlogModule,
          ),
      },
      {
        path: 'candlestick-patterns', //55
        loadChildren: () =>
          import('./fifty-five-uk-blog/fifty-five-uk-blog.module').then(
            (m) => m.FiftyFiveUkBlogModule,
          ),
      },
      {
        path: 'breakout-strategy', //56
        loadChildren: () =>
          import('./fifty-six-uk-blog/fifty-six-uk-blog.module').then(
            (m) => m.FiftySixUkBlogModule,
          ),
      },
      {
        path: 'vwap-indicator', //57
        loadChildren: () =>
          import('./fifty-seven-uk-blog/fifty-seven-uk-blog.module').then(
            (m) => m.FiftySevenUkBlogModule,
          ),
      },
      {
        path: 'ichimoku-cloud', //58
        loadChildren: () =>
          import('./fifty-eight-uk-blog/fifty-eight-uk-blog.module').then(
            (m) => m.FiftyEightUkBlogModule,
          ),
      },
      {
        path: 'ai-in-trading', //59
        loadChildren: () =>
          import('./fifty-nine-uk-blog/fifty-nine-uk-blog.module').then(
            (m) => m.FiftyNineUkBlogModule,
          ),
      },
      {
        path: 'trading-indicators', //60
        loadChildren: () =>
          import('./sixty-uk-blog/sixty-uk-blog.module').then(
            (m) => m.SixtyUkBlogModule,
          ),
      },
      // {
      //   path: 'adviceforbeginners', //1
      //   loadChildren: () =>
      //     import('../uk-trading/one-article/one-article.module').then(
      //       (m) => m.OneArticleModule,
      //     ),
      // },

      // {
      //   path: 'marketbasics', //2
      //   loadChildren: () =>
      //     import('../uk-trading/two-article/two-article.module').then(
      //       (m) => m.TwoArticleModule,
      //     ),
      // },
      // {
      //   path: 'exchange', //3
      //   loadChildren: () =>
      //     import('../uk-trading/three-article/three-article.module').then(
      //       (m) => m.ThreeArticleModule,
      //     ),
      // },
      // {
      //   path: 'exchangemarket', //4
      //   loadChildren: () =>
      //     import('../uk-trading/four-article/four-article.module').then(
      //       (m) => m.FourArticleModule,
      //     ),
      // },
      // {
      //   path: 'derivatives', //5
      //   loadChildren: () =>
      //     import('../uk-trading/five-article/five-article.module').then(
      //       (m) => m.FiveArticleModule,
      //     ),
      // },
      // {
      //   path: 'stablecoins', //6
      //   loadChildren: () =>
      //     import('../uk-trading/six-uk-artikle/six-uk-artikle.module').then(
      //       (m) => m.SixUkArtikleModule,
      //     ),
      // },
      // {
      //   path: 'forexmarket', //7
      //   loadChildren: () =>
      //     import('../uk-trading/seven-uk-article/seven-uk-article.module').then(
      //       (m) => m.SevenUkArticleModule,
      //     ),
      // },
      // {
      //   path: 'currenciesandquotes', //8
      //   loadChildren: () =>
      //     import('../uk-trading/eight-uk-article/eight-uk-article.module').then(
      //       (m) => m.EightUkArticleModule,
      //     ),
      // },
      // {
      //   path: 'formationexchange', //9
      //   loadChildren: () =>
      //     import('../uk-trading/nine-uk-artickle/nine-uk-artickle.module').then(
      //       (m) => m.NineUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'currencyposition', //10
      //   loadChildren: () =>
      //     import('../uk-trading/ten-uk-artickle/ten-uk-artickle.module').then(
      //       (m) => m.TenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'cryptostart', //11
      //   loadChildren: () =>
      //     import('../uk-trading/eleven-uk-artickle/eleven-uk-artickle.module').then(
      //       (m) => m.ElevenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'halving', //12
      //   loadChildren: () =>
      //     import('../uk-trading/twelve-uk-artickle/twelve-uk-artickle.module').then(
      //       (m) => m.TwelveUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'riskcurrencyexchange', //13
      //   loadChildren: () =>
      //     import('../uk-trading/thirteen-uk-artickle/thirteen-uk-artickle.module').then(
      //       (m) => m.ThirteenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'forexleveragerisk', //14
      //   loadChildren: () =>
      //     import('../uk-trading/fourteen-uk-artickle/fourteen-uk-artickle.module').then(
      //       (m) => m.FourteenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'majorbankfrs', //15
      //   loadChildren: () =>
      //     import('../uk-trading/fifteen-uk-artickle/fifteen-uk-artickle.module').then(
      //       (m) => m.FifteenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'ethereum', //16
      //   loadChildren: () =>
      //     import('../uk-trading/sixteen-uk-artickle/sixteen-uk-artickle.module').then(
      //       (m) => m.SixteenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'bitcoin', //17
      //   loadChildren: () =>
      //     import('../uk-trading/seventeen-uk-artickle/seventeen-uk-artickle.module').then(
      //       (m) => m.SeventeenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'psychorisks', //18
      //   loadChildren: () =>
      //     import('../uk-trading/eighteen-uk-artickle/eighteen-uk-artickle.module').then(
      //       (m) => m.EighteenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'howtotradeonforex', //19
      //   loadChildren: () =>
      //     import('../uk-trading/nineteen-uk-artickle/nineteen-uk-artickle.module').then(
      //       (m) => m.NineteenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'steidlmayeranalysis', //20
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-uk-artickle/twenty-uk-artickle.module').then(
      //       (m) => m.TwentyUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'marketanalysisforex', //21
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-one-uk-artickle/twenty-one-uk-artickle.module').then(
      //       (m) => m.TwentyOneUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'econimicfactors', //22
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-two-uk-artickle/twenty-two-uk-artickle.module').then(
      //       (m) => m.TwentyTwoUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'worldstockindicates', //23
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-three-uk-artickle/twenty-three-uk-artickle.module').then(
      //       (m) => m.TwentyThreeUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'fibonaccilevels', //24
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-four-uk-artickle/twenty-four-uk-artickle.module').then(
      //       (m) => m.TwentyFourUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'keyeconomicgrowth', //25
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-five-uk-artickle/twenty-five-uk-artickle.module').then(
      //       (m) => m.TwentyFiveUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'technicalanalysis', //26
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-six-uk-artickle/twenty-six-uk-artickle.module').then(
      //       (m) => m.TwentySixUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'technicalmarketcharts', //27
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-seven-uk-artickle/twenty-seven-uk-artickle.module').then(
      //       (m) => m.TwentySevenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'keypricepattern', //28
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-eight-uk-artickle/twenty-eight-uk-artickle.module').then(
      //       (m) => m.TwentyEightUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'smartmonettraps', //29
      //   loadChildren: () =>
      //     import('../uk-trading/twenty-nine-uk-artickle/twenty-nine-uk-artickle.module').then(
      //       (m) => m.TwentyNineUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'imbalanceandfvg', //30
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-uk-artickle/thirty-uk-artickle.module').then(
      //       (m) => m.ThirtyUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'marketorder', //31
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-one-uk-artickle/thirty-one-uk-artickle.module').then(
      //       (m) => m.ThirtyOneUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stoporder', //32
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-two-uk-artickle/thirty-two-uk-artickle.module').then(
      //       (m) => m.ThirtyTwoUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'requotes', //33
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-three-uk-artickle/thirty-three-uk-artickle.module').then(
      //       (m) => m.ThirtyThreeUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stoplimitorder', //34
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-four-uk-artickle/thirty-four-uk-artickle.module').then(
      //       (m) => m.ThirtyFourUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'tradingsystem', //35
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-five-uk-artickle/thirty-five-uk-artickle.module').then(
      //       (m) => m.ThirtyFiveUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'falsebreakouts', //36
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-six-uk-artickle/thirty-six-uk-artickle.module').then(
      //       (m) => m.ThirtySixUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'stophunting', //37
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-seven-uk-artickle/thirty-seven-uk-artickle.module').then(
      //       (m) => m.ThirtySevenUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'capitalmanagement', //38
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-eight-uk-artickle/thirty-eight-uk-artickle.module').then(
      //       (m) => m.ThirtyEightUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'profitandlossratio', //39
      //   loadChildren: () =>
      //     import('../uk-trading/thirty-nine-uk-artickle/thirty-nine-uk-artickle.module').then(
      //       (m) => m.ThirtyNineUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'beginnermistakes', //40
      //   loadChildren: () =>
      //     import('../uk-trading/fourty-uk-artickle/fourty-uk-artickle.module').then(
      //       (m) => m.FourtyUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'tradingplan', //41
      //   loadChildren: () =>
      //     import('../uk-trading/fourty-one-uk-artickle/fourty-one-uk-artickle.module').then(
      //       (m) => m.FourtyOneUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'timeframes', //42
      //   loadChildren: () =>
      //     import('../uk-trading/fourty-two-uk-artickle/fourty-two-uk-artickle.module').then(
      //       (m) => m.FourtyTwoUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'liquiditypools', //43
      //   loadChildren: () =>
      //     import('../uk-trading/fourty-three-uk-artickle/fourty-three-uk-artickle.module').then(
      //       (m) => m.FourtyThreeUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'icebergorders', //44
      //   loadChildren: () =>
      //     import('../uk-trading/fourty-four-uk-artickle/fourty-four-uk-artickle.module').then(
      //       (m) => m.FourtyFourUkArtickleModule,
      //     ),
      // },

      // {
      //   path: 'cryptotether', //46
      //   loadChildren: () =>
      //     import('../uk-trading/fourty-six-uk-artickle/fourty-six-uk-artickle.module').then(
      //       (m) => m.FourtySixUkArtickleModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneyconceptsguide', //61
      //   loadChildren: () =>
      //     import('../ukblog/sixty-one-uk-blog/sixty-one-uk-blog.module').then(
      //       (m) => m.SixtyOneUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneystrategies', //62
      //   loadChildren: () =>
      //     import('../ukblog/sixty-two-uk-blog/sixty-two-uk-blog.module').then(
      //       (m) => m.SixtyTwoUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'smartmoneycontrol', //63
      //   loadChildren: () =>
      //     import('../ukblog/sixty-three-uk-blog/sixty-three-uk-blog.module').then(
      //       (m) => m.SixtyThreeUkBlogModule,
      //     ),
      // },
     
      // {
      //   path: 'stockorderbook', //65
      //   loadChildren: () =>
      //     import('../ukblog/sixty-five-uk-blog/sixty-five-uk-blog.module').then(
      //       (m) => m.SixtyFiveUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'peakvolumelevels', //66
      //   loadChildren: () =>
      //     import('../ukblog/sixty-six-uk-blog/sixty-six-uk-blog.module').then(
      //       (m) => m.SixtySixUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'trendvolumeanalysis', //67
      //   loadChildren: () =>
      //     import('../ukblog/sixty-seven-uk-blog/sixty-seven-uk-blog.module').then(
      //       (m) => m.SixtySevenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'marketauctiondevelops', //68
      //   loadChildren: () =>
      //     import('../ukblog/sixty-eight-uk-blog/sixty-eight-uk-blog.module').then(
      //       (m) => m.SixtyEightUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'volumeandfuturesmarket', //69
      //   loadChildren: () =>
      //     import('../ukblog/sixty-nine-uk-blog/sixty-nine-uk-blog.module').then(
      //       (m) => m.SixtyNineUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'wyckoffsvolumeconcept', //70
      //   loadChildren: () =>
      //     import('../ukblog/seventy-uk-blog/seventy-uk-blog.module').then(
      //       (m) => m.SeventyUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'newstrading', //71
      //   loadChildren: () =>
      //     import('../ukblog/seventy-one-uk-blog/seventy-one-uk-blog.module').then(
      //       (m) => m.SeventyOneUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'economiccalendar', //72
      //   loadChildren: () =>
      //     import('../ukblog/seventy-two-uk-blog/seventy-two-uk-blog.module').then(
      //       (m) => m.SeventyTwoUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'macroeconomicindicators', //73
      //   loadChildren: () =>
      //     import('../ukblog/seventy-three-uk-blog/seventy-three-uk-blog.module').then(
      //       (m) => m.SeventyThreeUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'globalfundamentalanalysis', //74
      //   loadChildren: () =>
      //     import('../ukblog/seventy-four-uk-blog/seventy-four-uk-blog.module').then(
      //       (m) => m.SeventyFourUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'gamblingorbusiness', //75
      //   loadChildren: () =>
      //     import('../ukblog/seventy-five-uk-blog/seventy-five-uk-blog.module').then(
      //       (m) => m.SeventyFiveUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'williamgannpsychology', //76
      //   loadChildren: () =>
      //     import('../ukblog/seventy-six-uk-blog/seventy-six-uk-blog.module').then(
      //       (m) => m.SeventySixUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'emotionsaffect', //77
      //   loadChildren: () =>
      //     import('../ukblog/seventy-seven-uk-blog/seventy-seven-uk-blog.module').then(
      //       (m) => m.SeventySevenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'fomo', //78
      //   loadChildren: () =>
      //     import('../ukblog/seventy-eight-uk-blog/seventy-eight-uk-blog.module').then(
      //       (m) => m.SeventyEightUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'psychologyofaveraging', //79
      //   loadChildren: () =>
      //     import('../ukblog/seventy-nine-uk-blog/seventy-nine-uk-blog.module').then(
      //       (m) => m.SeventyNineUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'headandshoulders', //80
      //   loadChildren: () =>
      //     import('../ukblog/eighty-uk-blog/eighty-uk-blog.module').then(
      //       (m) => m.EightyUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'trianglefigure', //81
      //   loadChildren: () =>
      //     import('../ukblog/eighty-one-uk-blog/eighty-one-uk-blog.module').then(
      //       (m) => m.EightyOneUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'flagandpennant', //82
      //   loadChildren: () =>
      //     import('../ukblog/eighty-two-uk-blog/eighty-two-uk-blog.module').then(
      //       (m) => m.EightyTwoUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'cupandhandle', //83
      //   loadChildren: () =>
      //     import('../ukblog/eighty-three-uk-blog/eighty-three-uk-blog.module').then(
      //       (m) => m.EightyThreeUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'engulfing', //84
      //   loadChildren: () =>
      //     import('../ukblog/eighty-four-uk-blog/eighty-four-uk-blog.module').then(
      //       (m) => m.EightyFourUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'doubletopandbottom', //85
      //   loadChildren: () =>
      //     import('../ukblog/eighty-five-uk-blog/eighty-five-uk-blog.module').then(
      //       (m) => m.EightyFiveUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'pattern-1-2-3', //86
      //   loadChildren: () =>
      //     import('../ukblog/eighty-six-uk-blog/eighty-six-uk-blog.module').then(
      //       (m) => m.EightySixUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'copytrading', //87
      //   loadChildren: () =>
      //     import('../ukblog/eighty-seven-uk-blog/eighty-seven-uk-blog.module').then(
      //       (m) => m.EightySevenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'tradingview-platform', //88
      //   loadChildren: () =>
      //     import('../ukblog/eighty-eight-uk-blog/eighty-eight-uk-blog.module').then(
      //       (m) => m.EightyEightUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'bitcoin-domination', //89
      //   loadChildren: () =>
      //     import('../ukblog/eighty-nine-uk-blog/eighty-nine-uk-blog.module').then(
      //       (m) => m.EightyNineUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'metodmartingejla', //90
      //   loadChildren: () =>
      //     import('../ukblog/ninty-uk-blog/ninty-uk-blog.module').then(
      //       (m) => m.NintyUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'tiltintrading', //91
      //   loadChildren: () =>
      //     import('../ukblog/ninty-one-uk-blog/ninty-one-uk-blog.module').then(
      //       (m) => m.NintyOneUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'binarnyeopciony', //92
      //   loadChildren: () =>
      //     import('../ukblog/ninty-two-uk-blog/ninty-two-uk-blog.module').then(
      //       (m) => m.NintyTwoUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'atrindikator', //93
      //   loadChildren: () =>
      //     import('../ukblog/ninty-three-uk-blog/ninty-three-uk-blog.module').then(
      //       (m) => m.NintyThreeUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'spread', //94
      //   loadChildren: () =>
      //     import('../ukblog/ninty-four-uk-blog/ninty-four-uk-blog.module').then(
      //       (m) => m.NintyFourUkBlogModule,
      //     ),
      // },

      // {
      //   path: 'goldtrading', //95
      //   loadChildren: () =>
      //     import('../ukblog/ninty-five-uk-blog/ninty-five-uk-blog.module').then(
      //       (m) => m.NintyFiveUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'oiltrading', //96
      //   loadChildren: () =>
      //     import('../ukblog/ninty-six-uk-blog/ninty-six-uk-blog.module').then(
      //       (m) => m.NintySixUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'rsiindicator', //97
      //   loadChildren: () =>
      //     import('../ukblog/ninty-seven-uk-blog/ninty-seven-uk-blog.module').then(
      //       (m) => m.NintySevenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'stochastic', //98
      //   loadChildren: () =>
      //     import('../ukblog/ninty-eight-uk-blog/ninty-eight-uk-blog.module').then(
      //       (m) => m.NintyEightUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'macdindicator', //99
      //   loadChildren: () =>
      //     import('../ukblog/ninty-nine-uk-blog/ninty-nine-uk-blog.module').then(
      //       (m) => m.NintyNineUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'sp500trading', //100
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-uk-blog/onehundred-uk-blog.module').then(
      //       (m) => m.OnehundredUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'vwap', //101
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-one-uk-blog/onehundred-one-uk-blog.module').then(
      //       (m) => m.OnehundredOneUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'bollingerbands', //102
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-two-uk-blog/onehundred-two-uk-blog.module').then(
      //       (m) => m.OnehundredTwoUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'ichimoku', //103
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-three-uk-blog/onehundred-three-uk-blog.module').then(
      //       (m) => m.OnehundredThreeUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'solana', //104
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-four-uk-blog/onehundred-four-uk-blog.module').then(
      //       (m) => m.OnehundredFourUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'xrp', //105
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-five-uk-blog/onehundred-five-uk-blog.module').then(
      //       (m) => m.OnehundredFiveUkBlogModule,
      //     ),
      // },

      // {
      //   path: 'bitcoin-crash-stops', //111
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-eleven-uk-blog/onehundred-eleven-uk-blog.module').then(
      //       (m) => m.OnehundredElevenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'adx', //112
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-twelve-uk-blog/onehundred-twelve-uk-blog.module').then(
      //       (m) => m.OnehundredTwelveUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'ai-trading', //113
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-thirteen-uk-blog/onehundred-thirteen-uk-blog.module').then(
      //       (m) => m.OnehundredThirteenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'airdrop', //114
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-fourteen-uk-blog/onehundred-fourteen-uk-blog.module').then(
      //       (m) => m.OnehundredFourteenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'altseason', //115
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-fifteen-uk-blog/onehundred-fifteen-uk-blog.module').then(
      //       (m) => m.OnehundredFifteenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'backtest', //116
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-sixteen-uk-blog/onehundred-sixteen-uk-blog.module').then(
      //       (m) => m.OnehundredSixteenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'bonds-coupon-yield', //117
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-seventeen-uk-blog/onehundred-seventeen-uk-blog.module').then(
      //       (m) => m.OnehundredSeventeenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'breaker-mitigation-blocks', //118
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-eighteen-uk-blog/onehundred-eighteen-uk-blog.module').then(
      //       (m) => m.OnehundredEighteenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'breakeven', //119
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-nineteen-uk-blog/onehundred-nineteen-uk-blog.module').then(
      //       (m) => m.OnehundredNineteenUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'bull-bear-market', //120
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-twenty-uk-blog/onehundred-twenty-uk-blog.module').then(
      //       (m) => m.OnehundredTwentyUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'can-ai-predict-price', //121
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-twentyone-uk-blog/onehundred-twentyone-uk-blog.module').then(
      //       (m) => m.OnehundredTwentyoneUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'candle-hammer-doji-star', //122
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-twentytwo-uk-blog/onehundred-twentytwo-uk-blog.module').then(
      //       (m) => m.OnehundredTwentytwoUkBlogModule,
      //     ),
      // },
      // {
      //   path: 'carrytrade', //123
      //   loadChildren: () =>
      //     import('../ukblog/onehundred-twentythree-uk-blog/onehundred-twentythree-uk-blog.module').then(
      //       (m) => m.OnehundredTwentythreeUkBlogModule,
      //     ),
      // },
      //     {
      //       path: '124', //124
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-twentyfour-uk-blog/onehundred-twentyfour-uk-blog.module').then(
      //           (m) => m.OnehundredTwentyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '125', //125
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-twentyfive-uk-blog/onehundred-twentyfive-uk-blog.module').then(
      //           (m) => m.OnehundredTwentyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '126', //126
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-twentysix-uk-blog/onehundred-twentysix-uk-blog.module').then(
      //           (m) => m.OnehundredTwentysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '127', //127
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-twentyseven-uk-blog/onehundred-twentyseven-uk-blog.module').then(
      //           (m) => m.OnehundredTwentysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '128', //128
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-twentyeight-uk-blog/onehundred-twentyeight-uk-blog.module').then(
      //           (m) => m.OnehundredTwentyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '129', //129
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-twentynine-uk-blog/onehundred-twentynine-uk-blog.module').then(
      //           (m) => m.OnehundredTwentynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '130', //130
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirty-uk-blog/onehundred-thirty-uk-blog.module').then(
      //           (m) => m.OnehundredThirtyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '131', //131
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtyone-uk-blog/onehundred-thirtyone-uk-blog.module').then(
      //           (m) => m.OnehundredThirtyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '132', //132
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtytwo-uk-blog/onehundred-thirtytwo-uk-blog.module').then(
      //           (m) => m.OnehundredThirtytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '133', //133
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtythree-uk-blog/onehundred-thirtythree-uk-blog.module').then(
      //           (m) => m.OnehundredThirtythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '134', //134
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtyfour-uk-blog/onehundred-thirtyfour-uk-blog.module').then(
      //           (m) => m.OnehundredThirtyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '135', //135
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtyfive-uk-blog/onehundred-thirtyfive-uk-blog.module').then(
      //           (m) => m.OnehundredThirtyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '136', //136
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtysix-uk-blog/onehundred-thirtysix-uk-blog.module').then(
      //           (m) => m.OnehundredThirtysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '137', //137
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtyseven-uk-blog/onehundred-thirtyseven-uk-blog.module').then(
      //           (m) => m.OnehundredThirtysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '138', //138
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtyeight-uk-blog/onehundred-thirtyeight-uk-blog.module').then(
      //           (m) => m.OnehundredThirtyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '139', //139
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-thirtynine-uk-blog/onehundred-thirtynine-uk-blog.module').then(
      //           (m) => m.OnehundredThirtynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '140', //140
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-forty-uk-blog/onehundred-forty-uk-blog.module').then(
      //           (m) => m.OnehundredFortyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '141', //141
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortyone-uk-blog/onehundred-fortyone-uk-blog.module').then(
      //           (m) => m.OnehundredFortyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '142', //142
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortytwo-uk-blog/onehundred-fortytwo-uk-blog.module').then(
      //           (m) => m.OnehundredFortytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '143', //143
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortythree-uk-blog/onehundred-fortythree-uk-blog.module').then(
      //           (m) => m.OnehundredFortythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '144', //144
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortyfour-uk-blog/onehundred-fortyfour-uk-blog.module').then(
      //           (m) => m.OnehundredFortyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '145', //145
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortyfive-uk-blog/onehundred-fortyfive-uk-blog.module').then(
      //           (m) => m.OnehundredFortyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '146', //146
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortysix-uk-blog/onehundred-fortysix-uk-blog.module').then(
      //           (m) => m.OnehundredFortysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '147', //147
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortyseven-uk-blog/onehundred-fortyseven-uk-blog.module').then(
      //           (m) => m.OnehundredFortysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '148', //148
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortyeight-uk-blog/onehundred-fortyeight-uk-blog.module').then(
      //           (m) => m.OnehundredFortyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '149', //149
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fortynine-uk-blog/onehundred-fortynine-uk-blog.module').then(
      //           (m) => m.OnehundredFortynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '150', //150
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fifty-uk-blog/onehundred-fifty-uk-blog.module').then(
      //           (m) => m.OnehundredFiftyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '151', //151
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftyone-uk-blog/onehundred-fiftyone-uk-blog.module').then(
      //           (m) => m.OnehundredFiftyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '152', //152
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftytwo-uk-blog/onehundred-fiftytwo-uk-blog.module').then(
      //           (m) => m.OnehundredFiftytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '153', //153
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftythree-uk-blog/onehundred-fiftythree-uk-blog.module').then(
      //           (m) => m.OnehundredFiftythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '154', //154
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftyfour-uk-blog/onehundred-fiftyfour-uk-blog.module').then(
      //           (m) => m.OnehundredFiftyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '155', //155
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftyfive-uk-blog/onehundred-fiftyfive-uk-blog.module').then(
      //           (m) => m.OnehundredFiftyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '156', //156
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftysix-uk-blog/onehundred-fiftysix-uk-blog.module').then(
      //           (m) => m.OnehundredFiftysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '157', //157
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftyseven-uk-blog/onehundred-fiftyseven-uk-blog.module').then(
      //           (m) => m.OnehundredFiftysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '158', //158
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftyeight-uk-blog/onehundred-fiftyeight-uk-blog.module').then(
      //           (m) => m.OnehundredFiftyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '159', //159
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-fiftynine-uk-blog/onehundred-fiftynine-uk-blog.module').then(
      //           (m) => m.OnehundredFiftynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '160', //160
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixty-uk-blog/onehundred-sixty-uk-blog.module').then(
      //           (m) => m.OnehundredSixtyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '161', //161
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtyone-uk-blog/onehundred-sixtyone-uk-blog.module').then(
      //           (m) => m.OnehundredSixtyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '162', //162
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtytwo-uk-blog/onehundred-sixtytwo-uk-blog.module').then(
      //           (m) => m.OnehundredSixtytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '163', //163
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtythree-uk-blog/onehundred-sixtythree-uk-blog.module').then(
      //           (m) => m.OnehundredSixtythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '164', //164
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtyfour-uk-blog/onehundred-sixtyfour-uk-blog.module').then(
      //           (m) => m.OnehundredSixtyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '165', //165
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtyfive-uk-blog/onehundred-sixtyfive-uk-blog.module').then(
      //           (m) => m.OnehundredSixtyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '166', //166
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtysix-uk-blog/onehundred-sixtysix-uk-blog.module').then(
      //           (m) => m.OnehundredSixtysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '167', //167
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtyseven-uk-blog/onehundred-sixtyseven-uk-blog.module').then(
      //           (m) => m.OnehundredSixtysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '168', //168
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtyeight-uk-blog/onehundred-sixtyeight-uk-blog.module').then(
      //           (m) => m.OnehundredSixtyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '169', //169
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-sixtynine-uk-blog/onehundred-sixtynine-uk-blog.module').then(
      //           (m) => m.OnehundredSixtynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '170', //170
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventy-uk-blog/onehundred-seventy-uk-blog.module').then(
      //           (m) => m.OnehundredSeventyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '171', //171
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventyone-uk-blog/onehundred-seventyone-uk-blog.module').then(
      //           (m) => m.OnehundredSeventyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '172', //172
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventytwo-uk-blog/onehundred-seventytwo-uk-blog.module').then(
      //           (m) => m.OnehundredSeventytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '173', //173
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventythree-uk-blog/onehundred-seventythree-uk-blog.module').then(
      //           (m) => m.OnehundredSeventythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '174', //174
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventyfour-uk-blog/onehundred-seventyfour-uk-blog.module').then(
      //           (m) => m.OnehundredSeventyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '175', //175
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventyfive-uk-blog/onehundred-seventyfive-uk-blog.module').then(
      //           (m) => m.OnehundredSeventyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '176', //176
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventysix-uk-blog/onehundred-seventysix-uk-blog.module').then(
      //           (m) => m.OnehundredSeventysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '177', //177
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventyseven-uk-blog/onehundred-seventyseven-uk-blog.module').then(
      //           (m) => m.OnehundredSeventysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '178', //178
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventyeight-uk-blog/onehundred-seventyeight-uk-blog.module').then(
      //           (m) => m.OnehundredSeventyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '179', //179
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-seventynine-uk-blog/onehundred-seventynine-uk-blog.module').then(
      //           (m) => m.OnehundredSeventynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '180', //180
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eighty-uk-blog/onehundred-eighty-uk-blog.module').then(
      //           (m) => m.OnehundredEightyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '181', //181
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightyone-uk-blog/onehundred-eightyone-uk-blog.module').then(
      //           (m) => m.OnehundredEightyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '182', //182
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightytwo-uk-blog/onehundred-eightytwo-uk-blog.module').then(
      //           (m) => m.OnehundredEightytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '183', //183
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightythree-uk-blog/onehundred-eightythree-uk-blog.module').then(
      //           (m) => m.OnehundredEightythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '184', //184
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightyfour-uk-blog/onehundred-eightyfour-uk-blog.module').then(
      //           (m) => m.OnehundredEightyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '185', //185
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightyfive-uk-blog/onehundred-eightyfive-uk-blog.module').then(
      //           (m) => m.OnehundredEightyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '186', //186
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightysix-uk-blog/onehundred-eightysix-uk-blog.module').then(
      //           (m) => m.OnehundredEightysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '187', //187
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightyseven-uk-blog/onehundred-eightyseven-uk-blog.module').then(
      //           (m) => m.OnehundredEightysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '188', //188
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightyeight-uk-blog/onehundred-eightyeight-uk-blog.module').then(
      //           (m) => m.OnehundredEightyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '189', //189
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-eightynine-uk-blog/onehundred-eightynine-uk-blog.module').then(
      //           (m) => m.OnehundredEightynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '190', //190
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninety-uk-blog/onehundred-ninety-uk-blog.module').then(
      //           (m) => m.OnehundredNinetyUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '191', //191
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetyone-uk-blog/onehundred-ninetyone-uk-blog.module').then(
      //           (m) => m.OnehundredNinetyoneUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '192', //192
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetytwo-uk-blog/onehundred-ninetytwo-uk-blog.module').then(
      //           (m) => m.OnehundredNinetytwoUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '193', //193
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetythree-uk-blog/onehundred-ninetythree-uk-blog.module').then(
      //           (m) => m.OnehundredNinetythreeUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '194', //194
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetyfour-uk-blog/onehundred-ninetyfour-uk-blog.module').then(
      //           (m) => m.OnehundredNinetyfourUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '195', //195
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetyfive-uk-blog/onehundred-ninetyfive-uk-blog.module').then(
      //           (m) => m.OnehundredNinetyfiveUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '196', //196
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetysix-uk-blog/onehundred-ninetysix-uk-blog.module').then(
      //           (m) => m.OnehundredNinetysixUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '197', //197
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetyseven-uk-blog/onehundred-ninetyseven-uk-blog.module').then(
      //           (m) => m.OnehundredNinetysevenUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '198', //198
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetyeight-uk-blog/onehundred-ninetyeight-uk-blog.module').then(
      //           (m) => m.OnehundredNinetyeightUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '199', //199
      //       loadChildren: () =>
      //         import('../ukblog/onehundred-ninetynine-uk-blog/onehundred-ninetynine-uk-blog.module').then(
      //           (m) => m.OnehundredNinetynineUkBlogModule,
      //         ),
      //     },
      //     {
      //       path: '200', //200
      //       loadChildren: () =>
      //         import('../ukblog/twohundred-uk-blog/twohundred-uk-blog.module').then(
      //           (m) => m.TwohundredUkBlogModule,
      //         ),
      //     },
    ],
  },
];

@NgModule({
  declarations: [UkBlogHomepageComponent, CoverComponent, SearchblockComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
})
export class UkblogModule {}
