import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtySixComponent } from './home-ru-fourty-six/home-ru-fourty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtySixComponent }];

@NgModule({
  declarations: [HomeRuFourtySixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySixRuArtickleModule {}
