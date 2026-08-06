import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyThreeComponent } from './home-uk-blog-sixty-three/home-uk-blog-sixty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyThreeComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyThreeUkBlogModule {}
