import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyFiveComponent } from './home-ru-thirty-five/home-ru-thirty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyFiveComponent }];
@NgModule({
  declarations: [HomeRuThirtyFiveComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveRuArtickleModule {}
