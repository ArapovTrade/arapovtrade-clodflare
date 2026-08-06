import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyFiveComponent } from './home-uk-blog-ninty-five.component';

describe('HomeUkBlogNintyFiveComponent', () => {
  let component: HomeUkBlogNintyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
