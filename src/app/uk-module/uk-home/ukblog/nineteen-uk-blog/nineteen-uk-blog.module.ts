import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNineteenComponent } from './home-uk-blog-nineteen/home-uk-blog-nineteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNineteenComponent }];

@NgModule({
  declarations: [HomeUkBlogNineteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineteenUkBlogModule {}
