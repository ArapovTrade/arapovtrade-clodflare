import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftySevenComponent } from './home-ru-blog-fifty-seven/home-ru-blog-fifty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftySevenComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftySevenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftySevenRuBlogModule {}
