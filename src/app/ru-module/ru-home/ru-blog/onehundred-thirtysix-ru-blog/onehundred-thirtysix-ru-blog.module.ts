import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtysixComponent } from './home-ru-blog-onehundred-thirtysix/home-ru-blog-onehundred-thirtysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtysixRuBlogModule { }
