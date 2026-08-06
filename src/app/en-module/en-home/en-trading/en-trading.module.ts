import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnTradingHomepageComponent } from './en-trading-homepage/en-trading-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: EnTradingHomepageComponent },
  // // { path: 'adviceForBeginners', component: EnTradingArticleOneComponent },
  // {
  //   path: 'adviceforbeginners',
  //   loadChildren: () =>
  //     import('./one-en-article/one-en-article.module').then(
  //       (m) => m.OneEnArticleModule
  //     ),
  // },
  // {
  //   path: 'marketbasics',
  //   loadChildren: () =>
  //     import('./two-en-article/two-en-article.module').then(
  //       (m) => m.TwoEnArticleModule
  //     ),
  // },
  // {
  //   path: 'exchange',
  //   loadChildren: () =>
  //     import('./three-en-article/three-en-article.module').then(
  //       (m) => m.ThreeEnArticleModule
  //     ),
  // },
  // {
  //   path: 'exchangemarket',
  //   loadChildren: () =>
  //     import('./four-en-article/four-en-article.module').then(
  //       (m) => m.FourEnArticleModule
  //     ),
  // },
  // {
  //   path: 'derivatives',
  //   loadChildren: () =>
  //     import('./five-en-article/five-en-article.module').then(
  //       (m) => m.FiveEnArticleModule
  //     ),
  // },
  // {
  //   path: 'exchangeparticipants',
  //   loadChildren: () =>
  //     import('./six-en-article/six-en-article.module').then(
  //       (m) => m.SixEnArticleModule
  //     ),
  // },
  // {
  //   path: 'forexmarket',
  //   loadChildren: () =>
  //     import('./seven-en-article/seven-en-article.module').then(
  //       (m) => m.SevenEnArticleModule
  //     ),
  // },
  // {
  //   path: 'currenciesandquotes',
  //   loadChildren: () =>
  //     import('./eight-en-article/eight-en-article.module').then(
  //       (m) => m.EightEnArticleModule
  //     ),
  // },
  // {
  //   path: 'formationexchange',
  //   loadChildren: () =>
  //     import('./nine-en-artickle/nine-en-artickle.module').then(
  //       (m) => m.NineEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'currencyposition',
  //   loadChildren: () =>
  //     import('./ten-en-artickle/ten-en-artickle.module').then(
  //       (m) => m.TenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'forexvaluedate',
  //   loadChildren: () =>
  //     import('./eleven-en-artickle/eleven-en-artickle.module').then(
  //       (m) => m.ElevenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'howtomakemoney',
  //   loadChildren: () =>
  //     import('./twelve-en-artickle/twelve-en-artickle.module').then(
  //       (m) => m.TwelveEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'riskcurrencyexchange',
  //   loadChildren: () =>
  //     import('./thirteen-en-artickle/thirteen-en-artickle.module').then(
  //       (m) => m.ThirteenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'forexleveragerisk',
  //   loadChildren: () =>
  //     import('./fourteen-en-artickle/fourteen-en-artickle.module').then(
  //       (m) => m.FourteenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'majorbankfrs',
  //   loadChildren: () =>
  //     import('./fifteen-en-artickle/fifteen-en-artickle.module').then(
  //       (m) => m.FifteenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'behavioralrisks',
  //   loadChildren: () =>
  //     import('./sixteen-en-artickle/sixteen-en-artickle.module').then(
  //       (m) => m.SixteenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'nonmarketrisks',
  //   loadChildren: () =>
  //     import('./seventeen-en-artickle/seventeen-en-artickle.module').then(
  //       (m) => m.SeventeenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'psychorisks',
  //   loadChildren: () =>
  //     import('./eighteen-en-artickle/eighteen-en-artickle.module').then(
  //       (m) => m.EighteenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'howtotradeonforex',
  //   loadChildren: () =>
  //     import('./nineteen-en-artickle/nineteen-en-artickle.module').then(
  //       (m) => m.NineteenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'marketanalysis',
  //   loadChildren: () =>
  //     import('./twenty-en-artickle/twenty-en-artickle.module').then(
  //       (m) => m.TwentyEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'marketanalysisforex',
  //   loadChildren: () =>
  //     import('./twenty-one-en-artickle/twenty-one-en-artickle.module').then(
  //       (m) => m.TwentyOneEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'econimicfactors',
  //   loadChildren: () =>
  //     import('./twenty-two-en-artickle/twenty-two-en-artickle.module').then(
  //       (m) => m.TwentyTwoEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'worldstockindicates',
  //   loadChildren: () =>
  //     import('./twenty-three-en-artickle/twenty-three-en-artickle.module').then(
  //       (m) => m.TwentyThreeEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'economicstate',
  //   loadChildren: () =>
  //     import('./twenty-four-en-artickle/twenty-four-en-artickle.module').then(
  //       (m) => m.TwentyFourEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'keyeconomicgrowth',
  //   loadChildren: () =>
  //     import('./twenty-five-en-artickle/twenty-five-en-artickle.module').then(
  //       (m) => m.TwentyFiveEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'technicalanalysis',
  //   loadChildren: () =>
  //     import('./twenty-six-en-artickle/twenty-six-en-artickle.module').then(
  //       (m) => m.TwentySixEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'technicalmarketcharts',
  //   loadChildren: () =>
  //     import('./twenty-seven-en-artickle/twenty-seven-en-artickle.module').then(
  //       (m) => m.TwentySevenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'keypricepattern',
  //   loadChildren: () =>
  //     import('./twenty-eight-en-artickle/twenty-eight-en-artickle.module').then(
  //       (m) => m.TwentyEightEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'volumemarketanalysis',
  //   loadChildren: () =>
  //     import('./twenty-nine-en-artickle/twenty-nine-en-artickle.module').then(
  //       (m) => m.TwentyNineEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'typesoforders',
  //   loadChildren: () =>
  //     import('./thirty-en-artickle/thirty-en-artickle.module').then(
  //       (m) => m.ThirtyEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'marketorder',
  //   loadChildren: () =>
  //     import('./thirty-one-en-artickle/thirty-one-en-artickle.module').then(
  //       (m) => m.ThirtyOneEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'stoporder',
  //   loadChildren: () =>
  //     import('./thirty-two-en-artickle/thirty-two-en-artickle.module').then(
  //       (m) => m.ThirtyTwoEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'requotes',
  //   loadChildren: () =>
  //     import('./thirty-three-en-artickle/thirty-three-en-artickle.module').then(
  //       (m) => m.ThirtyThreeEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'stoplimitorder',
  //   loadChildren: () =>
  //     import('./thirty-four-en-artickle/thirty-four-en-artickle.module').then(
  //       (m) => m.ThirtyFourEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'tradingsystem',
  //   loadChildren: () =>
  //     import('./thirty-five-en-artickle/thirty-five-en-artickle.module').then(
  //       (m) => m.ThirtyFiveEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'tradingsystemsseparation',
  //   loadChildren: () =>
  //     import('./thirty-six-en-artickle/thirty-six-en-artickle.module').then(
  //       (m) => m.ThirtySixEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'tradingsystemautomation',
  //   loadChildren: () =>
  //     import('./thirty-seven-en-artickle/thirty-seven-en-artickle.module').then(
  //       (m) => m.ThirtySevenEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'capitalmanagement',
  //   loadChildren: () =>
  //     import('./thirty-eight-en-artickle/thirty-eight-en-artickle.module').then(
  //       (m) => m.ThirtyEightEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'profitandlossratio',
  //   loadChildren: () =>
  //     import('./thirty-nine-en-artickle/thirty-nine-en-artickle.module').then(
  //       (m) => m.ThirtyNineEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'beginnermistakes',
  //   loadChildren: () =>
  //     import('./fourty-en-artickle/fourty-en-artickle.module').then(
  //       (m) => m.FourtyEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'tradingplan',
  //   loadChildren: () =>
  //     import('./fourty-one-en-artickle/fourty-one-en-artickle.module').then(
  //       (m) => m.FourtyOneEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'timeframes',
  //   loadChildren: () =>
  //     import('./fourty-two-en-artickle/fourty-two-en-artickle.module').then(
  //       (m) => m.FourtyTwoEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'selectingtimeframe',
  //   loadChildren: () =>
  //     import('./fourty-three-en-artickle/fourty-three-en-artickle.module').then(
  //       (m) => m.FourtyThreeEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'timeframeforbeginner',
  //   loadChildren: () =>
  //     import('./fourty-four-en-artickle/fourty-four-en-artickle.module').then(
  //       (m) => m.FourtyFourEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'typeoftimeframes',
  //   loadChildren: () =>
  //     import('./fourty-five-en-artickle/fourty-five-en-artickle.module').then(
  //       (m) => m.FourtyFiveEnArtickleModule
  //     ),
  // },
  // {
  //   path: 'reasonforloosingmoney',
  //   loadChildren: () =>
  //     import('./fourty-six-en-artickle/fourty-six-en-artickle.module').then(
  //       (m) => m.FourtySixEnArtickleModule
  //     ),
  // },
];

@NgModule({
  declarations: [EnTradingHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EnTradingModule {}
