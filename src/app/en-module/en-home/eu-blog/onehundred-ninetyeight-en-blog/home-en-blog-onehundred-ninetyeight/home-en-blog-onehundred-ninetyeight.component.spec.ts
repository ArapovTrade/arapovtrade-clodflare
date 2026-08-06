import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetyeightComponent } from './home-en-blog-onehundred-ninetyeight.component';

describe('HomeEnBlogOnehundredNinetyeightComponent', () => {
  let component: HomeEnBlogOnehundredNinetyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
