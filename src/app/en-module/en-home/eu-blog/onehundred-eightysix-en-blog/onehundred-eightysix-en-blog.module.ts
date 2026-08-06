import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightysixComponent } from './home-en-blog-onehundred-eightysix/home-en-blog-onehundred-eightysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightysixEnBlogModule { }
