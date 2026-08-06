import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiveComponent } from './home-uk-blog-five.component';

describe('HomeUkBlogFiveComponent', () => {
  let component: HomeUkBlogFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
