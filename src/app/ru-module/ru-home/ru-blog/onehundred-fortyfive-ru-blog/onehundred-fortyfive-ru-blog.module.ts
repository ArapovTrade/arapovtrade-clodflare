import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortyfiveComponent } from './home-ru-blog-onehundred-fortyfive/home-ru-blog-onehundred-fortyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyfiveRuBlogModule { }
