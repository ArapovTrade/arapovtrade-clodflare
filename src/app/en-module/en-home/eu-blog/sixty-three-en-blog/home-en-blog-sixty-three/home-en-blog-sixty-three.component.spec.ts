import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyThreeComponent } from './home-en-blog-sixty-three.component';

describe('HomeEnBlogSixtyThreeComponent', () => {
  let component: HomeEnBlogSixtyThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
