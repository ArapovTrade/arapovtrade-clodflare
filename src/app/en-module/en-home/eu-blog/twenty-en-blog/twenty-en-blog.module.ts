import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyComponent } from './home-en-blog-twenty/home-en-blog-twenty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEnBlogModule {}
