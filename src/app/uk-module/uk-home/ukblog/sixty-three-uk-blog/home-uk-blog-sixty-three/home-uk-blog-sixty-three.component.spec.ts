import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyThreeComponent } from './home-uk-blog-sixty-three.component';

describe('HomeUkBlogSixtyThreeComponent', () => {
  let component: HomeUkBlogSixtyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
