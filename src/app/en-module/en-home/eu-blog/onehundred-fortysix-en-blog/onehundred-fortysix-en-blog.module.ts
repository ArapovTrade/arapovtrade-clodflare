import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortysixComponent } from './home-en-blog-onehundred-fortysix/home-en-blog-onehundred-fortysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortysixEnBlogModule { }
