import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwelveComponent } from './home-ru-blog-onehundred-twelve/home-ru-blog-onehundred-twelve.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwelveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwelveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwelveRuBlogModule { }
