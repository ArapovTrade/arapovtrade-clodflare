import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyEightComponent } from './home-ru-twenty-eight/home-ru-twenty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyEightComponent }];
@NgModule({
  declarations: [HomeRuTwentyEightComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEightRuArtickleModule {}
