import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtyfourComponent } from './home-ru-blog-onehundred-sixtyfour/home-ru-blog-onehundred-sixtyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyfourRuBlogModule { }
