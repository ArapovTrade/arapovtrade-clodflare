import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftyfiveComponent } from './home-ru-blog-onehundred-fiftyfive/home-ru-blog-onehundred-fiftyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyfiveRuBlogModule { }
