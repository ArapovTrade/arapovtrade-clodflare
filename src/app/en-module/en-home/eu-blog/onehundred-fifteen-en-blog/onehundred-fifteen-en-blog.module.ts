import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFifteenComponent } from './home-en-blog-onehundred-fifteen/home-en-blog-onehundred-fifteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFifteenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFifteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFifteenEnBlogModule { }
