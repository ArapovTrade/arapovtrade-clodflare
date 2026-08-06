import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftyeightComponent } from './home-ru-blog-onehundred-fiftyeight.component';

describe('HomeRuBlogOnehundredFiftyeightComponent', () => {
  let component: HomeRuBlogOnehundredFiftyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
