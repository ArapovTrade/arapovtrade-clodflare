import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtysixComponent } from './home-ru-blog-onehundred-sixtysix/home-ru-blog-onehundred-sixtysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtysixRuBlogModule { }
