import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightComponent } from './home-uk-blog-eight.component';

describe('HomeUkBlogEightComponent', () => {
  let component: HomeUkBlogEightComponent;
  let fixture: ComponentFixture<HomeUkBlogEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
