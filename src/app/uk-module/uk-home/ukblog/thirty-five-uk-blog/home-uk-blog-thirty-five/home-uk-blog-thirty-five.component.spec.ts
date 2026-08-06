import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyFiveComponent } from './home-uk-blog-thirty-five.component';

describe('HomeUkBlogThirtyFiveComponent', () => {
  let component: HomeUkBlogThirtyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
