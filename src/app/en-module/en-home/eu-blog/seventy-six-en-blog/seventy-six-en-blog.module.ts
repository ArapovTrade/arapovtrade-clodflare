import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventySixComponent } from './home-en-blog-seventy-six/home-en-blog-seventy-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventySixComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventySixEnBlogModule {}
