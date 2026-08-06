import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentySevenComponent } from './home-ru-twenty-seven/home-ru-twenty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentySevenComponent }];
@NgModule({
  declarations: [HomeRuTwentySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentySevenRuArtickleModule {}
