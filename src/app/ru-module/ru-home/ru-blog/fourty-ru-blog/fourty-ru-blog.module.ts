import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyComponent } from './home-ru-blog-fourty/home-ru-blog-fourty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtyComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtyComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyRuBlogModule {}
