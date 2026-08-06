import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuSevenComponent } from './home-ru-seven/home-ru-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuSevenComponent }];

@NgModule({
  declarations: [HomeRuSevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SevenRuArticleModule {}
