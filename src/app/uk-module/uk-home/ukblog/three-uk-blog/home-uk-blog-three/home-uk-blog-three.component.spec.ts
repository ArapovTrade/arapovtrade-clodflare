import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThreeComponent } from './home-uk-blog-three.component';

describe('HomeUkBlogThreeComponent', () => {
  let component: HomeUkBlogThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
