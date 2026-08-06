import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyOneComponent } from './home-uk-blog-fifty-one/home-uk-blog-fifty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyOneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyOneUkBlogModule {}
