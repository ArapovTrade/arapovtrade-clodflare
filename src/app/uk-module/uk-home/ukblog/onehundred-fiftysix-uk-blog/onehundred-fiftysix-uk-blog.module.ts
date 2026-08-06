import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftysixComponent } from './home-uk-blog-onehundred-fiftysix/home-uk-blog-onehundred-fiftysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftysixUkBlogModule { }
