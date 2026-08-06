import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyThreeComponent } from './home-uk-blog-thirty-three.component';

describe('HomeUkBlogThirtyThreeComponent', () => {
  let component: HomeUkBlogThirtyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
