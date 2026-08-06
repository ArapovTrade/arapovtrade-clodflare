import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOneComponent } from './home-uk-blog-one.component';

describe('HomeUkBlogOneComponent', () => {
  let component: HomeUkBlogOneComponent;
  let fixture: ComponentFixture<HomeUkBlogOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
