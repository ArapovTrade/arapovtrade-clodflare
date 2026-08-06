import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetyfourComponent } from './home-en-blog-onehundred-ninetyfour/home-en-blog-onehundred-ninetyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyfourEnBlogModule { }
