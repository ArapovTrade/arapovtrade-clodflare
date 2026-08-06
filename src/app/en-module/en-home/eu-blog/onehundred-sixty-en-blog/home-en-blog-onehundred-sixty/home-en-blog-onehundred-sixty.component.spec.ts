import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtyComponent } from './home-en-blog-onehundred-sixty.component';

describe('HomeEnBlogOnehundredSixtyComponent', () => {
  let component: HomeEnBlogOnehundredSixtyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
