import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyTwoComponent } from './home-uk-blog-thirty-two.component';

describe('HomeUkBlogThirtyTwoComponent', () => {
  let component: HomeUkBlogThirtyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
