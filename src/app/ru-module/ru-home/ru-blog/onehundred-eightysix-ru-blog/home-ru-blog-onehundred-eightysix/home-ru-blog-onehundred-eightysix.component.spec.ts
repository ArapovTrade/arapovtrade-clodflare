import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightysixComponent } from './home-ru-blog-onehundred-eightysix.component';

describe('HomeRuBlogOnehundredEightysixComponent', () => {
  let component: HomeRuBlogOnehundredEightysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
