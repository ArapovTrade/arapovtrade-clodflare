import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuSeventeenComponent } from './home-ru-seventeen/home-ru-seventeen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuSeventeenComponent }];
@NgModule({
  declarations: [HomeRuSeventeenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventeenRuArtickleModule {}
