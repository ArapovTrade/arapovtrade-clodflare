import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortysixComponent } from './home-uk-blog-onehundred-fortysix/home-uk-blog-onehundred-fortysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortysixUkBlogModule { }
