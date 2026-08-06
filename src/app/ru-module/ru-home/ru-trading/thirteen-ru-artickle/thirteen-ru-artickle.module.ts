import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirteenComponent } from './home-ru-thirteen/home-ru-thirteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirteenComponent }];

@NgModule({
  declarations: [HomeRuThirteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirteenRuArtickleModule {}
