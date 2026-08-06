import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyTwoComponent } from './home-ru-blog-fifty-two/home-ru-blog-fifty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyTwoComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyTwoRuBlogModule {}
