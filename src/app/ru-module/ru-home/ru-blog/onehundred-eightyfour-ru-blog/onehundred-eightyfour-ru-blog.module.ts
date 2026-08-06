import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightyfourComponent } from './home-ru-blog-onehundred-eightyfour/home-ru-blog-onehundred-eightyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyfourRuBlogModule { }
