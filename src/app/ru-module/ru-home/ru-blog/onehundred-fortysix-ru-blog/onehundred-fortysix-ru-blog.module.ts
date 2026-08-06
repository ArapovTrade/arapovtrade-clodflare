import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortysixComponent } from './home-ru-blog-onehundred-fortysix/home-ru-blog-onehundred-fortysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortysixRuBlogModule { }
