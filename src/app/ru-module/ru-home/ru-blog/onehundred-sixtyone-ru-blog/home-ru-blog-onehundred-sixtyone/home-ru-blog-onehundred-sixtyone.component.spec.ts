import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtyoneComponent } from './home-ru-blog-onehundred-sixtyone.component';

describe('HomeRuBlogOnehundredSixtyoneComponent', () => {
  let component: HomeRuBlogOnehundredSixtyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
