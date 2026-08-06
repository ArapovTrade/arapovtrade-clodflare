import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeThreeEnComponent } from './home-three-en/home-three-en.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeThreeEnComponent }];

@NgModule({
  declarations: [HomeThreeEnComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThreeEnArticleModule {}
