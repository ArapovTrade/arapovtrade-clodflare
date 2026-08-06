import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetynineComponent } from './home-uk-blog-onehundred-ninetynine/home-uk-blog-onehundred-ninetynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetynineUkBlogModule { }
