import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightysevenComponent } from './home-ru-blog-onehundred-eightyseven/home-ru-blog-onehundred-eightyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightysevenRuBlogModule { }
