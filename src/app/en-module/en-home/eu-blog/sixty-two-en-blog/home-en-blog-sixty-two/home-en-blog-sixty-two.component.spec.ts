import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyTwoComponent } from './home-en-blog-sixty-two.component';

describe('HomeEnBlogSixtyTwoComponent', () => {
  let component: HomeEnBlogSixtyTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
