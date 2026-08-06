import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwoComponent } from './home-uk-blog-two.component';

describe('HomeUkBlogTwoComponent', () => {
  let component: HomeUkBlogTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
