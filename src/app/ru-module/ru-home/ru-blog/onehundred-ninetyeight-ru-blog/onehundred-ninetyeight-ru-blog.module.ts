import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetyeightComponent } from './home-ru-blog-onehundred-ninetyeight/home-ru-blog-onehundred-ninetyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyeightRuBlogModule { }
