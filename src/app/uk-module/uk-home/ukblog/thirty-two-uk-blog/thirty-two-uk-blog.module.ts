import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyTwoComponent } from './home-uk-blog-thirty-two/home-uk-blog-thirty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoUkBlogModule {}
