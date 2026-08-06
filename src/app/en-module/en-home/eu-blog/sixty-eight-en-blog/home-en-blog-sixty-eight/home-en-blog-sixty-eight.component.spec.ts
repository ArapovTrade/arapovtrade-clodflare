import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyEightComponent } from './home-en-blog-sixty-eight.component';

describe('HomeEnBlogSixtyEightComponent', () => {
  let component: HomeEnBlogSixtyEightComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
