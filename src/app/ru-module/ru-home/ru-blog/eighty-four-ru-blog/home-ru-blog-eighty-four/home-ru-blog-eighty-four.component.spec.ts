import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyFourComponent } from './home-ru-blog-eighty-four.component';

describe('HomeRuBlogEightyFourComponent', () => {
  let component: HomeRuBlogEightyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
