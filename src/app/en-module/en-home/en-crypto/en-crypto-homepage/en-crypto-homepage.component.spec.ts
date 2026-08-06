import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnCryptoHomepageComponent } from './en-crypto-homepage.component';

describe('EnCryptoHomepageComponent', () => {
  let component: EnCryptoHomepageComponent;
  let fixture: ComponentFixture<EnCryptoHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnCryptoHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnCryptoHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
