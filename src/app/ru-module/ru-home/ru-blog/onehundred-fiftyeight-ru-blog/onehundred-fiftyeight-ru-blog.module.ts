import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftyeightComponent } from './home-ru-blog-onehundred-fiftyeight/home-ru-blog-onehundred-fiftyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyeightRuBlogModule { }
