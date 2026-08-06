import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortythreeComponent } from './home-uk-blog-onehundred-fortythree/home-uk-blog-onehundred-fortythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortythreeUkBlogModule { }
