import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyFourComponent } from './home-en-blog-sixty-four.component';

describe('HomeEnBlogSixtyFourComponent', () => {
  let component: HomeEnBlogSixtyFourComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
