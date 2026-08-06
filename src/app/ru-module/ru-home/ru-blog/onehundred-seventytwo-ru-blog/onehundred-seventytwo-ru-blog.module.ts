import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventytwoComponent } from './home-ru-blog-onehundred-seventytwo/home-ru-blog-onehundred-seventytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventytwoRuBlogModule { }
