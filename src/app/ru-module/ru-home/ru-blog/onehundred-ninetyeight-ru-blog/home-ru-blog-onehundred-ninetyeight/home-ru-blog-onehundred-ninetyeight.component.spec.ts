import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetyeightComponent } from './home-ru-blog-onehundred-ninetyeight.component';

describe('HomeRuBlogOnehundredNinetyeightComponent', () => {
  let component: HomeRuBlogOnehundredNinetyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
