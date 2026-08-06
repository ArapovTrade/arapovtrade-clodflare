import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyThreeComponent } from './home-uk-blog-fifty-three/home-uk-blog-fifty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyThreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyThreeUkBlogModule {}
