import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentynineComponent } from './home-en-blog-onehundred-twentynine/home-en-blog-onehundred-twentynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentynineEnBlogModule { }
