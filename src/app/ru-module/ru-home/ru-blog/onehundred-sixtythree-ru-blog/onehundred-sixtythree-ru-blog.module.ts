import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtythreeComponent } from './home-ru-blog-onehundred-sixtythree/home-ru-blog-onehundred-sixtythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtythreeRuBlogModule { }
