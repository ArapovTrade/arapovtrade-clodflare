import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftytwoComponent } from './home-ru-blog-onehundred-fiftytwo/home-ru-blog-onehundred-fiftytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftytwoRuBlogModule { }
