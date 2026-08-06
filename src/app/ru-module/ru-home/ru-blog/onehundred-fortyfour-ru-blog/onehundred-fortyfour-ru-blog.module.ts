import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortyfourComponent } from './home-ru-blog-onehundred-fortyfour/home-ru-blog-onehundred-fortyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyfourRuBlogModule { }
