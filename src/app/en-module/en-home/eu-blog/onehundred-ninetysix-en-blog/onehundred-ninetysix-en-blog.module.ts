import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetysixComponent } from './home-en-blog-onehundred-ninetysix/home-en-blog-onehundred-ninetysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetysixEnBlogModule { }
