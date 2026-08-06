import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyTwoComponent } from './home-uk-blog-ninty-two/home-uk-blog-ninty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyTwoUkBlogModule { }
