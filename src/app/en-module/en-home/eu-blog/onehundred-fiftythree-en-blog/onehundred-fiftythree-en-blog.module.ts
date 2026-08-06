import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftythreeComponent } from './home-en-blog-onehundred-fiftythree/home-en-blog-onehundred-fiftythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftythreeEnBlogModule { }
