import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortynineComponent } from './home-en-blog-onehundred-fortynine/home-en-blog-onehundred-fortynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortynineEnBlogModule { }
