import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourteenComponent } from './home-ru-fourteen/home-ru-fourteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourteenComponent }];

@NgModule({
  declarations: [HomeRuFourteenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourteenRuArtickleModule {}
