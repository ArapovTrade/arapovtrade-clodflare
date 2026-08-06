import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwelveComponent } from './home-uk-blog-twelve/home-uk-blog-twelve.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwelveComponent }];

@NgModule({
  declarations: [HomeUkBlogTwelveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwelveUkBlogModule {}
