import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventytwoComponent } from './home-ru-blog-onehundred-seventytwo.component';

describe('HomeRuBlogOnehundredSeventytwoComponent', () => {
  let component: HomeRuBlogOnehundredSeventytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
