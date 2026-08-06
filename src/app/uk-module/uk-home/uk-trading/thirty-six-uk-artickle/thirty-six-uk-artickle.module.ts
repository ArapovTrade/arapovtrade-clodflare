import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtySixComponent } from './home-uk-thirty-six/home-uk-thirty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtySixComponent }];
@NgModule({
  declarations: [HomeUkThirtySixComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySixUkArtickleModule {}
