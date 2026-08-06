import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFourteenComponent } from './home-ru-blog-onehundred-fourteen/home-ru-blog-onehundred-fourteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFourteenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFourteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFourteenRuBlogModule { }
