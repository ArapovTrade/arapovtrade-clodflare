import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourteenComponent } from './home-uk-fourteen/home-uk-fourteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourteenComponent }];

@NgModule({
  declarations: [HomeUkFourteenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourteenUkArtickleModule {}
