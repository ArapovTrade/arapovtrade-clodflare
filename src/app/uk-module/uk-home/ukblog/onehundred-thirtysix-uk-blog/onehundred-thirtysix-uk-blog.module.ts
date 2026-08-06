import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtysixComponent } from './home-uk-blog-onehundred-thirtysix/home-uk-blog-onehundred-thirtysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtysixUkBlogModule { }
