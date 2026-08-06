import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyThreeComponent } from './home-uk-blog-ninty-three/home-uk-blog-ninty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component:  HomeUkBlogNintyThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyThreeUkBlogModule { }
