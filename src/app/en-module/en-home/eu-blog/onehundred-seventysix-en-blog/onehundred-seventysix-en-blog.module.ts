import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventysixComponent } from './home-en-blog-onehundred-seventysix/home-en-blog-onehundred-seventysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventysixEnBlogModule { }
