import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtyeightComponent } from './home-ru-blog-onehundred-thirtyeight/home-ru-blog-onehundred-thirtyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyeightRuBlogModule { }
