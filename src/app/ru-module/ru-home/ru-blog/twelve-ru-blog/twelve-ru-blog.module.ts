import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwelveComponent } from './home-ru-blog-twelve/home-ru-blog-twelve.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwelveComponent }];

@NgModule({
  declarations: [HomeRuBlogTwelveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwelveRuBlogModule {}
