import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyFiveComponent } from './home-uk-blog-eighty-five.component';

describe('HomeUkBlogEightyFiveComponent', () => {
  let component: HomeUkBlogEightyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
