import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtytwoComponent } from './home-uk-blog-onehundred-thirtytwo.component';

describe('HomeUkBlogOnehundredThirtytwoComponent', () => {
  let component: HomeUkBlogOnehundredThirtytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
