import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyEightComponent } from './home-uk-blog-fifty-eight/home-uk-blog-fifty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyEightUkBlogModule {}
