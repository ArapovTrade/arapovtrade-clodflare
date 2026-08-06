import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkSeventeenComponent } from './home-uk-seventeen/home-uk-seventeen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkSeventeenComponent }];
@NgModule({
  declarations: [HomeUkSeventeenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventeenUkArtickleModule {}
