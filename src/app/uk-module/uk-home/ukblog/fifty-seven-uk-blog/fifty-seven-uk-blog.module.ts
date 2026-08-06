import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftySevenComponent } from './home-uk-blog-fifty-seven/home-uk-blog-fifty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftySevenComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftySevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftySevenUkBlogModule {}
