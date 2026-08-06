import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightyfiveComponent } from './home-ru-blog-onehundred-eightyfive/home-ru-blog-onehundred-eightyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyfiveRuBlogModule { }
