import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtythreeComponent } from './home-en-blog-onehundred-thirtythree/home-en-blog-onehundred-thirtythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtythreeEnBlogModule { }
