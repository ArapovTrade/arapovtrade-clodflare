import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyFiveComponent } from './home-ru-blog-eighty-five.component';

describe('HomeRuBlogEightyFiveComponent', () => {
  let component: HomeRuBlogEightyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
