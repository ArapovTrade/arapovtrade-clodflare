import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEighteenComponent } from './home-uk-blog-eighteen/home-uk-blog-eighteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEighteenComponent }];

@NgModule({
  declarations: [HomeUkBlogEighteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EighteenUkBlogModule {}
