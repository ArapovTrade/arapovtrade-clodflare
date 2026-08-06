import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortysevenComponent } from './home-ru-blog-onehundred-fortyseven/home-ru-blog-onehundred-fortyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortysevenRuBlogModule { }
