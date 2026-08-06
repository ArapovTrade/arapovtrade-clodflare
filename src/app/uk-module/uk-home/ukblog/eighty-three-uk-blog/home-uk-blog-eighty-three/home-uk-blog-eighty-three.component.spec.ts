import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyThreeComponent } from './home-uk-blog-eighty-three.component';

describe('HomeUkBlogEightyThreeComponent', () => {
  let component: HomeUkBlogEightyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
