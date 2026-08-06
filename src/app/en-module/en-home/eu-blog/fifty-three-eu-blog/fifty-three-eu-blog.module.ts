import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyThreeComponent } from './home-eu-blog-fifty-three/home-eu-blog-fifty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyThreeComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyThreeComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyThreeEuBlogModule {}
