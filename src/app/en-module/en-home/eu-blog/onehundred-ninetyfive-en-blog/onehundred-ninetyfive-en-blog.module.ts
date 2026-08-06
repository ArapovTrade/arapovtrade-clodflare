import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetyfiveComponent } from './home-en-blog-onehundred-ninetyfive/home-en-blog-onehundred-ninetyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyfiveEnBlogModule { }
