import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtyfiveComponent } from './home-en-blog-onehundred-sixtyfive/home-en-blog-onehundred-sixtyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyfiveEnBlogModule { }
