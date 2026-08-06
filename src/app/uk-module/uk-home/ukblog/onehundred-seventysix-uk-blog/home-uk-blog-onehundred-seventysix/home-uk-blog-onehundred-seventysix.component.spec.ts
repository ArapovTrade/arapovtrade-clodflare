import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventysixComponent } from './home-uk-blog-onehundred-seventysix.component';

describe('HomeUkBlogOnehundredSeventysixComponent', () => {
  let component: HomeUkBlogOnehundredSeventysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
