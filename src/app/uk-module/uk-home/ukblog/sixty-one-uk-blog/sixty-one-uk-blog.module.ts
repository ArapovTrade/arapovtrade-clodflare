import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyOneComponent } from './home-uk-blog-sixty-one/home-uk-blog-sixty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyOneUkBlogModule {}
