import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyFourComponent } from './home-uk-blog-fifty-four/home-uk-blog-fifty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyFourUkBlogModule {}
