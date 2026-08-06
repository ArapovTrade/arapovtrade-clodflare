import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFifteenComponent } from './home-uk-fifteen/home-uk-fifteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFifteenComponent }];

@NgModule({
  declarations: [HomeUkFifteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FifteenUkArtickleModule {}
