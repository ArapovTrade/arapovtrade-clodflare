import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftyfourComponent } from './home-ru-blog-onehundred-fiftyfour/home-ru-blog-onehundred-fiftyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyfourRuBlogModule { }
