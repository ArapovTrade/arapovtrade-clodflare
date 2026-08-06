import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightySixComponent } from './home-uk-blog-eighty-six/home-uk-blog-eighty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightySixComponent }];

@NgModule({
  declarations: [HomeUkBlogEightySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightySixUkBlogModule {}
