import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNineComponent } from './home-uk-blog-nine/home-uk-blog-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNineComponent }];

@NgModule({
  declarations: [HomeUkBlogNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class NineUkBlogModule {}
