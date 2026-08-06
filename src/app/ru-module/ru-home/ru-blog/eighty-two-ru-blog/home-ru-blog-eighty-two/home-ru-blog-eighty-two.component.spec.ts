import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyTwoComponent } from './home-ru-blog-eighty-two.component';

describe('HomeRuBlogEightyTwoComponent', () => {
  let component: HomeRuBlogEightyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
