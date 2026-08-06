import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyComponent } from './home-uk-blog-sixty/home-uk-blog-sixty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyUkBlogModule {}
