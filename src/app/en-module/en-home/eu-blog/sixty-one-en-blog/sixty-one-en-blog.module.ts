import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyOneComponent } from './home-en-blog-sixty-one/home-en-blog-sixty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyOneEnBlogModule {}
