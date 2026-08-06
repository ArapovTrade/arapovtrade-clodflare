import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtynineComponent } from './home-en-blog-onehundred-sixtynine/home-en-blog-onehundred-sixtynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtynineEnBlogModule { }
