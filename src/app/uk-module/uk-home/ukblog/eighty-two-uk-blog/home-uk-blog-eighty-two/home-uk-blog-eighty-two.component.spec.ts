import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyTwoComponent } from './home-uk-blog-eighty-two.component';

describe('HomeUkBlogEightyTwoComponent', () => {
  let component: HomeUkBlogEightyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
