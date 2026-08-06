import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuCryptoHomepageComponent } from './ru-crypto-homepage.component';

describe('RuCryptoHomepageComponent', () => {
  let component: RuCryptoHomepageComponent;
  let fixture: ComponentFixture<RuCryptoHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuCryptoHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuCryptoHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
