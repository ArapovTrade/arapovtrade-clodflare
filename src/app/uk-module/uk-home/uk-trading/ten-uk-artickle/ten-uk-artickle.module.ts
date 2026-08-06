import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTenComponent } from './home-uk-ten/home-uk-ten.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTenComponent }];

@NgModule({
  declarations: [HomeUkTenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TenUkArtickleModule {}
