import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkSixteenComponent } from './home-uk-sixteen/home-uk-sixteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkSixteenComponent }];
@NgModule({
  declarations: [HomeUkSixteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixteenUkArtickleModule {}
