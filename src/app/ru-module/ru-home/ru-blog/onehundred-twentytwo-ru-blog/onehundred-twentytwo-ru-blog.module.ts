import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentytwoComponent } from './home-ru-blog-onehundred-twentytwo/home-ru-blog-onehundred-twentytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentytwoRuBlogModule { }
