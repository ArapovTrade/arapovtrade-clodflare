import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightyfiveComponent } from './home-ru-blog-onehundred-eightyfive.component';

describe('HomeRuBlogOnehundredEightyfiveComponent', () => {
  let component: HomeRuBlogOnehundredEightyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
