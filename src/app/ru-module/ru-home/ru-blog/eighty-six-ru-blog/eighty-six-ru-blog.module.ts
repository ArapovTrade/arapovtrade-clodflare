import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightySixComponent } from './home-ru-blog-eighty-six/home-ru-blog-eighty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightySixComponent }];

@NgModule({
  declarations: [HomeRuBlogEightySixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightySixRuBlogModule {}
