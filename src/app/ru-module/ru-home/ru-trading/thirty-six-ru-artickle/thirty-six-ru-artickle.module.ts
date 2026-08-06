import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtySixComponent } from './home-ru-thirty-six/home-ru-thirty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtySixComponent }];
@NgModule({
  declarations: [HomeRuThirtySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySixRuArtickleModule {}
