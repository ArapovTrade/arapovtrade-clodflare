import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtySixComponent } from './home-ru-blog-thirty-six/home-ru-blog-thirty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtySixComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySixRuBlogModule {}
