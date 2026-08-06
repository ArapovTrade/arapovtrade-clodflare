import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyTwoComponent } from './home-uk-blog-twenty-two/home-uk-blog-twenty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyTwoUkBlogModule {}
