import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyThreeComponent } from './home-ru-fourty-three/home-ru-fourty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyThreeComponent }];

@NgModule({
  declarations: [HomeRuFourtyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyThreeRuArtickleModule {}
