import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetysixComponent } from './home-uk-blog-onehundred-ninetysix/home-uk-blog-onehundred-ninetysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetysixUkBlogModule { }
