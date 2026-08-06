import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyFourComponent } from './home-ru-blog-eighty-four/home-ru-blog-eighty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyFourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyFourRuBlogModule {}
