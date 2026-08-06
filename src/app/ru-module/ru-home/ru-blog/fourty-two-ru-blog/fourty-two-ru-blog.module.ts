import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyTwoComponent } from './home-ru-blog-fourty-two/home-ru-blog-fourty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyTwoRuBlogModule {}
