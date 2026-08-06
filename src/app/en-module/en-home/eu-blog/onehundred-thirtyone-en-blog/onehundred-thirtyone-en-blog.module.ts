import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtyoneComponent } from './home-en-blog-onehundred-thirtyone/home-en-blog-onehundred-thirtyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyoneEnBlogModule { }
