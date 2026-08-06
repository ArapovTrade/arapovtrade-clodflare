import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftynineComponent } from './home-en-blog-onehundred-fiftynine/home-en-blog-onehundred-fiftynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftynineEnBlogModule { }
