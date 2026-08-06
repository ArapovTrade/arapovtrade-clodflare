import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtySixComponent } from './home-uk-blog-sixty-six/home-uk-blog-sixty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtySixComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtySixUkBlogModule {}
