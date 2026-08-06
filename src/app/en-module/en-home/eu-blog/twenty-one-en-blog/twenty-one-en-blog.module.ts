import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyOneComponent } from './home-en-blog-twenty-one/home-en-blog-twenty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyOneEnBlogModule {}
