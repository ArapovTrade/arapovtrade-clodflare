import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventynineComponent } from './home-en-blog-onehundred-seventynine/home-en-blog-onehundred-seventynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventynineEnBlogModule { }
