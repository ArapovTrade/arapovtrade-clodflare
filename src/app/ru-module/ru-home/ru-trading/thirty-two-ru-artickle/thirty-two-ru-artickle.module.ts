import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyTwoComponent } from './home-ru-thirty-two/home-ru-thirty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyTwoComponent }];
@NgModule({
  declarations: [HomeRuThirtyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoRuArtickleModule {}
