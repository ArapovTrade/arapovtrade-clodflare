import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyNineComponent } from './home-ru-thirty-nine/home-ru-thirty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyNineComponent }];
@NgModule({
  declarations: [HomeRuThirtyNineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyNineRuArtickleModule {}
