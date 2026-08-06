import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuEighteenComponent } from './home-ru-eighteen/home-ru-eighteen.component';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuEighteenComponent }];
@NgModule({
  declarations: [HomeRuEighteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EighteenRuArtickleModule {}
