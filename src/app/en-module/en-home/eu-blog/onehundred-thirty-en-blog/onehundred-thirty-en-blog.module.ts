import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtyComponent } from './home-en-blog-onehundred-thirty/home-en-blog-onehundred-thirty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyEnBlogModule { }
