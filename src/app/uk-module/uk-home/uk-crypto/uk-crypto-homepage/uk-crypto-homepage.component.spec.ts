import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkCryptoHomepageComponent } from './uk-crypto-homepage.component';

describe('UkCryptoHomepageComponent', () => {
  let component: UkCryptoHomepageComponent;
  let fixture: ComponentFixture<UkCryptoHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UkCryptoHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkCryptoHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
