import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftyfiveComponent } from './home-en-blog-onehundred-fiftyfive/home-en-blog-onehundred-fiftyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyfiveEnBlogModule { }
