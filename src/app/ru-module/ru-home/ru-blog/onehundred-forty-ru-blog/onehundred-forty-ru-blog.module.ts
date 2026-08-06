import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortyComponent } from './home-ru-blog-onehundred-forty/home-ru-blog-onehundred-forty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyRuBlogModule { }
