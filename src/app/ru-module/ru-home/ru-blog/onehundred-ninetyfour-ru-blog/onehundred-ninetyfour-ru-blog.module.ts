import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetyfourComponent } from './home-ru-blog-onehundred-ninetyfour/home-ru-blog-onehundred-ninetyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyfourRuBlogModule { }
