import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyFiveComponent } from './home-en-blog-ninty-five.component';

describe('HomeEnBlogNintyFiveComponent', () => {
  let component: HomeEnBlogNintyFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
