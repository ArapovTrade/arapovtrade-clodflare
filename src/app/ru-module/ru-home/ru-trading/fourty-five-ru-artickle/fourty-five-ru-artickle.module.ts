import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyFiveComponent } from './home-ru-fourty-five/home-ru-fourty-five.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyFiveComponent }];

@NgModule({
  declarations: [HomeRuFourtyFiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFiveRuArtickleModule {}
