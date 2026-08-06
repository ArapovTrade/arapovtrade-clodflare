import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuNineComponent } from './home-ru-nine/home-ru-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuNineComponent }];

@NgModule({
  declarations: [HomeRuNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineRuArticleModule {}
