import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyFiveComponent } from './home-uk-blog-eighty-five/home-uk-blog-eighty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyFiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyFiveUkBlogModule {}
