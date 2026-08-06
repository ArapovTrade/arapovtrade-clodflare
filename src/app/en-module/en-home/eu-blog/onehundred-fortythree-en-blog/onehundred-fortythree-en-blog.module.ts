import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortythreeComponent } from './home-en-blog-onehundred-fortythree/home-en-blog-onehundred-fortythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortythreeEnBlogModule { }
