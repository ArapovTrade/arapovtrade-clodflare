import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtysevenComponent } from './home-ru-blog-onehundred-thirtyseven/home-ru-blog-onehundred-thirtyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtysevenRuBlogModule { }
