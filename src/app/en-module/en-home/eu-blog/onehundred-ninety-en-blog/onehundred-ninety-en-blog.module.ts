import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetyComponent } from './home-en-blog-onehundred-ninety/home-en-blog-onehundred-ninety.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyEnBlogModule { }
