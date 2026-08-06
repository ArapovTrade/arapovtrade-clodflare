import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyFiveComponent } from './home-ru-blog-fifty-five/home-ru-blog-fifty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyFiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyFiveRuBlogModule {}
