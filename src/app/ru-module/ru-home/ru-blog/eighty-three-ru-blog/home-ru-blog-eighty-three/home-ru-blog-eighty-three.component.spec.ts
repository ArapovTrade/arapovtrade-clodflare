import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyThreeComponent } from './home-ru-blog-eighty-three.component';

describe('HomeRuBlogEightyThreeComponent', () => {
  let component: HomeRuBlogEightyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
