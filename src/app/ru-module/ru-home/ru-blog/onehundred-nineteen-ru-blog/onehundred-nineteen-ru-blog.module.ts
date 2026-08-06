import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNineteenComponent } from './home-ru-blog-onehundred-nineteen/home-ru-blog-onehundred-nineteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNineteenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNineteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNineteenRuBlogModule { }
