import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTenComponent } from './home-ru-ten/home-ru-ten.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTenComponent }];

@NgModule({
  declarations: [HomeRuTenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class TenRuArtickleModule {}
