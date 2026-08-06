import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyTwoComponent } from './home-uk-blog-sixty-two/home-uk-blog-sixty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyTwoUkBlogModule {}
