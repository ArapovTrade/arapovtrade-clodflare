import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetynineComponent } from './home-en-blog-onehundred-ninetynine/home-en-blog-onehundred-ninetynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetynineEnBlogModule { }
