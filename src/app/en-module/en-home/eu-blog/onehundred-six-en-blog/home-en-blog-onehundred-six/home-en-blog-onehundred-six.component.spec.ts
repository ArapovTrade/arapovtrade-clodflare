import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixComponent } from './home-en-blog-onehundred-six.component';

describe('HomeEnBlogOnehundredSixComponent', () => {
  let component: HomeEnBlogOnehundredSixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
