import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtytwoComponent } from './home-ru-blog-onehundred-thirtytwo.component';

describe('HomeRuBlogOnehundredThirtytwoComponent', () => {
  let component: HomeRuBlogOnehundredThirtytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
