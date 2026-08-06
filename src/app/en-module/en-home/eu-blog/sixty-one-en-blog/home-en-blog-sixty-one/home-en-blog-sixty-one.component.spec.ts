import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyOneComponent } from './home-en-blog-sixty-one.component';

describe('HomeEnBlogSixtyOneComponent', () => {
  let component: HomeEnBlogSixtyOneComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
