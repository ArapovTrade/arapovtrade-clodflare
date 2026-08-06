import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtyfiveComponent } from './home-ru-blog-onehundred-sixtyfive/home-ru-blog-onehundred-sixtyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyfiveRuBlogModule { }
