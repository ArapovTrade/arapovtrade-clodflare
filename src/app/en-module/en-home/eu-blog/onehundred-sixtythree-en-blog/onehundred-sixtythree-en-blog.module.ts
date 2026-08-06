import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtythreeComponent } from './home-en-blog-onehundred-sixtythree/home-en-blog-onehundred-sixtythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtythreeEnBlogModule { }
