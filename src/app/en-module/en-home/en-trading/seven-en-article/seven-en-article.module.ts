import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnSevenComponent } from './home-en-seven/home-en-seven.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [
  {
    path: '',
    component: HomeEnSevenComponent,
  },
];

@NgModule({
  declarations: [HomeEnSevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SevenEnArticleModule {}
