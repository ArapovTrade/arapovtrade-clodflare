import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixComponent } from './home-ru-blog-onehundred-six.component';

describe('HomeRuBlogOnehundredSixComponent', () => {
  let component: HomeRuBlogOnehundredSixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
