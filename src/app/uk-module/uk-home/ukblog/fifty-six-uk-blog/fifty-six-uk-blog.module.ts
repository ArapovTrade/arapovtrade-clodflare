import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftySixComponent } from './home-uk-blog-fifty-six/home-uk-blog-fifty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftySixComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftySixUkBlogModule {}
