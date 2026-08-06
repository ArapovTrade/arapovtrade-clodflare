import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyEightComponent } from './home-ru-thirty-eight/home-ru-thirty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyEightComponent }];
@NgModule({
  declarations: [HomeRuThirtyEightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class ThirtyEightRuArtickleModule {}
