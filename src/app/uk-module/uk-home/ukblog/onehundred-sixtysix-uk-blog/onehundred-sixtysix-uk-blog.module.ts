import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtysixComponent } from './home-uk-blog-onehundred-sixtysix/home-uk-blog-onehundred-sixtysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtysixUkBlogModule { }
