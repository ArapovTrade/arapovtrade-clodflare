import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtytwoComponent } from './home-en-blog-onehundred-thirtytwo.component';

describe('HomeEnBlogOnehundredThirtytwoComponent', () => {
  let component: HomeEnBlogOnehundredThirtytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
