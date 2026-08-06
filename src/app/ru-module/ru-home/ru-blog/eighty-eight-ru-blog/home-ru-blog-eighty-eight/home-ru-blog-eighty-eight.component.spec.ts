import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyEightComponent } from './home-ru-blog-eighty-eight.component';

describe('HomeRuBlogEightyEightComponent', () => {
  let component: HomeRuBlogEightyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
