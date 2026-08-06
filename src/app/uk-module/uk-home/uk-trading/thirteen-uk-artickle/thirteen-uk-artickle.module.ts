import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirteenComponent } from './home-uk-thirteen/home-uk-thirteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirteenComponent }];

@NgModule({
  declarations: [HomeUkThirteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirteenUkArtickleModule {}
