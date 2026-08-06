import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtysevenComponent } from './home-en-blog-onehundred-thirtyseven/home-en-blog-onehundred-thirtyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtysevenEnBlogModule { }
