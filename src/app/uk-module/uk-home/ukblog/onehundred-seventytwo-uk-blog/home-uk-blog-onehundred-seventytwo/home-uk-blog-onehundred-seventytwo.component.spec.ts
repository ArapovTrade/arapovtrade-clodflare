import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventytwoComponent } from './home-uk-blog-onehundred-seventytwo.component';

describe('HomeUkBlogOnehundredSeventytwoComponent', () => {
  let component: HomeUkBlogOnehundredSeventytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
