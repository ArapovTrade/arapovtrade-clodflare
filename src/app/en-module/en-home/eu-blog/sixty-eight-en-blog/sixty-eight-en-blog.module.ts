import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyEightComponent } from './home-en-blog-sixty-eight/home-en-blog-sixty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyEightComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class SixtyEightEnBlogModule {}
