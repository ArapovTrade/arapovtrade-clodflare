import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyNineComponent } from './home-ru-blog-eighty-nine.component';

describe('HomeRuBlogEightyNineComponent', () => {
  let component: HomeRuBlogEightyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
