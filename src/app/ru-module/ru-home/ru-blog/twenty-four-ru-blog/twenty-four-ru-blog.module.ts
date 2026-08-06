import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyFourComponent } from './home-ru-blog-twenty-four/home-ru-blog-twenty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyFourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyFourRuBlogModule {}
