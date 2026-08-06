import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFifteenComponent } from './home-ru-blog-onehundred-fifteen/home-ru-blog-onehundred-fifteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFifteenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFifteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFifteenRuBlogModule { }
