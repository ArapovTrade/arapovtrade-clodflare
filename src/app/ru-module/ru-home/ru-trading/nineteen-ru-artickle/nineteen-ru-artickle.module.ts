import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuNineteenComponent } from './home-ru-nineteen/home-ru-nineteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuNineteenComponent }];
@NgModule({
  declarations: [HomeRuNineteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineteenRuArtickleModule {}
