import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtySevenComponent } from './home-ru-thirty-seven/home-ru-thirty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtySevenComponent }];
@NgModule({
  declarations: [HomeRuThirtySevenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySevenRuArtickleModule {}
