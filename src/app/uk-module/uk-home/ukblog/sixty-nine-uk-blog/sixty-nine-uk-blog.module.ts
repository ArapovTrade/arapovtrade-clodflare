import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyNineComponent } from './home-uk-blog-sixty-nine/home-uk-blog-sixty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyNineUkBlogModule {}
