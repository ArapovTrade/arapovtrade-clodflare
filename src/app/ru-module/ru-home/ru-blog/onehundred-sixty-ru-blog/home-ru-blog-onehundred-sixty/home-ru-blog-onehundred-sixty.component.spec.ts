import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtyComponent } from './home-ru-blog-onehundred-sixty.component';

describe('HomeRuBlogOnehundredSixtyComponent', () => {
  let component: HomeRuBlogOnehundredSixtyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
