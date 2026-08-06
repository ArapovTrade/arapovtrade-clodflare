import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetysixComponent } from './home-ru-blog-onehundred-ninetysix/home-ru-blog-onehundred-ninetysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetysixRuBlogModule { }
