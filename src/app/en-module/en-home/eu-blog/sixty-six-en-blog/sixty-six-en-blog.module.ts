import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtySixComponent } from './home-en-blog-sixty-six/home-en-blog-sixty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtySixComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtySixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtySixEnBlogModule {}
