import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortyoneComponent } from './home-en-blog-onehundred-fortyone/home-en-blog-onehundred-fortyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyoneEnBlogModule { }
