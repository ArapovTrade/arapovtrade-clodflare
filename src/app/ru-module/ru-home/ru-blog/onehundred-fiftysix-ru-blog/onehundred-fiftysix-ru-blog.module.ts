import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftysixComponent } from './home-ru-blog-onehundred-fiftysix/home-ru-blog-onehundred-fiftysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftysixRuBlogModule { }
