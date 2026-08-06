import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtySixComponent } from './home-ru-blog-fourty-six/home-ru-blog-fourty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtySixComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtySixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySixRuBlogModule {}
