import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyFiveComponent } from './home-ru-blog-sixty-five/home-ru-blog-sixty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyFiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyFiveRuBlogModule {}
