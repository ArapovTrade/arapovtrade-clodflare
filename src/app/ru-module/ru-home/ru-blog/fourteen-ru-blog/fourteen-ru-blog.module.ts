import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourteenComponent } from './home-ru-blog-fourteen/home-ru-blog-fourteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourteenComponent }];

@NgModule({
  declarations: [HomeRuBlogFourteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourteenRuBlogModule {}
