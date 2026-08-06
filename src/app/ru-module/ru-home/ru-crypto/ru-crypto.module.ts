import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuCryptoHomepageComponent } from './ru-crypto-homepage/ru-crypto-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: RuCryptoHomepageComponent }];

@NgModule({
  declarations: [RuCryptoHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuCryptoModule {}
