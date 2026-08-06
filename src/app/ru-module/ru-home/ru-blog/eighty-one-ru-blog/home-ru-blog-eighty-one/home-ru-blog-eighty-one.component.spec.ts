import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyOneComponent } from './home-ru-blog-eighty-one.component';

describe('HomeRuBlogEightyOneComponent', () => {
  let component: HomeRuBlogEightyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
