import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetythreeComponent } from './home-en-blog-onehundred-ninetythree/home-en-blog-onehundred-ninetythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetythreeEnBlogModule { }
