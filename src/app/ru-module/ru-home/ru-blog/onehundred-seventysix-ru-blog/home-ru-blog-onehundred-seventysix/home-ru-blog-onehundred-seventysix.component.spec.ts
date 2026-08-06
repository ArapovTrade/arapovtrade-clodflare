import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventysixComponent } from './home-ru-blog-onehundred-seventysix.component';

describe('HomeRuBlogOnehundredSeventysixComponent', () => {
  let component: HomeRuBlogOnehundredSeventysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
