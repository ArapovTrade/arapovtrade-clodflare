import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventeenComponent } from './home-en-blog-onehundred-seventeen/home-en-blog-onehundred-seventeen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventeenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventeenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventeenEnBlogModule { }
