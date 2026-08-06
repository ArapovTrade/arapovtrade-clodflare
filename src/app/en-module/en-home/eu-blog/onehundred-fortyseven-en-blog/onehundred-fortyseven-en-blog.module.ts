import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortysevenComponent } from './home-en-blog-onehundred-fortyseven/home-en-blog-onehundred-fortyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortysevenEnBlogModule { }
