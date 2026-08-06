import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftysixComponent } from './home-en-blog-onehundred-fiftysix/home-en-blog-onehundred-fiftysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftysixEnBlogModule { }
