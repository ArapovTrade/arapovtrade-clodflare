import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftytwoComponent } from './home-en-blog-onehundred-fiftytwo/home-en-blog-onehundred-fiftytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftytwoEnBlogModule { }
