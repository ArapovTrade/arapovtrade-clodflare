import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtyfourComponent } from './home-en-blog-onehundred-sixtyfour/home-en-blog-onehundred-sixtyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyfourEnBlogModule { }
