import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyTwoComponent } from './home-en-blog-ninty-two/home-en-blog-ninty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyTwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyTwoEnBlogModule { }
