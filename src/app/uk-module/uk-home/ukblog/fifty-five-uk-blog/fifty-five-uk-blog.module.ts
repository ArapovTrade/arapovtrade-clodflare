import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyFiveComponent } from './home-uk-blog-fifty-five/home-uk-blog-fifty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyFiveUkBlogModule {}
