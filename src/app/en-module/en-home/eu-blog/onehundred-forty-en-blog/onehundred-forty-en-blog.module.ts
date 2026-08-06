import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortyComponent } from './home-en-blog-onehundred-forty/home-en-blog-onehundred-forty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyEnBlogModule { }
