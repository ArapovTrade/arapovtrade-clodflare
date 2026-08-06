import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightyComponent } from './home-en-blog-onehundred-eighty/home-en-blog-onehundred-eighty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyEnBlogModule { }
