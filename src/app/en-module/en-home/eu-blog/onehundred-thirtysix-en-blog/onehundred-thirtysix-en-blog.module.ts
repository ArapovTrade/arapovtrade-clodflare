import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtysixComponent } from './home-en-blog-onehundred-thirtysix/home-en-blog-onehundred-thirtysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtysixEnBlogModule { }
