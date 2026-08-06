import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkNineteenComponent } from './home-uk-nineteen/home-uk-nineteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkNineteenComponent }];
@NgModule({
  declarations: [HomeUkNineteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineteenUkArtickleModule {}
