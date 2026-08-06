import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyThreeComponent } from './home-ru-blog-fourty-three/home-ru-blog-fourty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogFourtyThreeComponent },
];

@NgModule({
  declarations: [HomeRuBlogFourtyThreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyThreeRuBlogModule {}
