import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyEightComponent } from './home-ru-blog-fourty-eight/home-ru-blog-fourty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogFourtyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogFourtyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyEightRuBlogModule {}
