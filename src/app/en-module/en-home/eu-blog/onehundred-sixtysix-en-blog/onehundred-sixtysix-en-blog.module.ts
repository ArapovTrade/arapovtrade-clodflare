import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtysixComponent } from './home-en-blog-onehundred-sixtysix/home-en-blog-onehundred-sixtysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtysixEnBlogModule { }
