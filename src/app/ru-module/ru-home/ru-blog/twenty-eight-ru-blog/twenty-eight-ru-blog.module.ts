import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyEightComponent } from './home-ru-blog-twenty-eight/home-ru-blog-twenty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogTwentyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogTwentyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEightRuBlogModule {}
