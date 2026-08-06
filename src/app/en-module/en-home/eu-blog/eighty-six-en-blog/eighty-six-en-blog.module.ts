import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightySixComponent } from './home-en-blog-eighty-six/home-en-blog-eighty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightySixComponent }];

@NgModule({
  declarations: [HomeEnBlogEightySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightySixEnBlogModule {}
