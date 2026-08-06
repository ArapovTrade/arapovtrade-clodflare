import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventeenComponent } from './home-uk-blog-seventeen/home-uk-blog-seventeen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventeenComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventeenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class SeventeenUkBlogModule {}
