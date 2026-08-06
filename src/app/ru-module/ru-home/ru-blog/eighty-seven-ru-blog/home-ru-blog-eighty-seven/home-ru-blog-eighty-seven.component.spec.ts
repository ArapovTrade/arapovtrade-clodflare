import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightySevenComponent } from './home-ru-blog-eighty-seven.component';

describe('HomeRuBlogEightySevenComponent', () => {
  let component: HomeRuBlogEightySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogEightySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
