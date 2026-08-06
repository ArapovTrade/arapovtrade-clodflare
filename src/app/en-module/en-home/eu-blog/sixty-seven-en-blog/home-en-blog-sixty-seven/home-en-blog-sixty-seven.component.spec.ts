import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtySevenComponent } from './home-en-blog-sixty-seven.component';

describe('HomeEnBlogSixtySevenComponent', () => {
  let component: HomeEnBlogSixtySevenComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
