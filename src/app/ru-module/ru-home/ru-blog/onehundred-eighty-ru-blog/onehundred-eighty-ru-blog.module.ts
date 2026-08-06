import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightyComponent } from './home-ru-blog-onehundred-eighty/home-ru-blog-onehundred-eighty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyRuBlogModule { }
