import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightysevenComponent } from './home-en-blog-onehundred-eightyseven/home-en-blog-onehundred-eightyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightysevenEnBlogModule { }
