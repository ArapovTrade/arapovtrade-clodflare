import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFifteenComponent } from './home-ru-fifteen/home-ru-fifteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFifteenComponent }];

@NgModule({
  declarations: [HomeRuFifteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FifteenRuArtickleModule {}
