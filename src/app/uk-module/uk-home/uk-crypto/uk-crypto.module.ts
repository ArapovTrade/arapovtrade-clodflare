import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkCryptoHomepageComponent } from './uk-crypto-homepage/uk-crypto-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: UkCryptoHomepageComponent }];

@NgModule({
  declarations: [UkCryptoHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UkCryptoModule {}
