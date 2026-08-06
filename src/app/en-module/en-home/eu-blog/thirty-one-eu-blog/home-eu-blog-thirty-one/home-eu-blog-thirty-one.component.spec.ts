import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyOneComponent } from './home-eu-blog-thirty-one.component';

describe('HomeEuBlogThirtyOneComponent', () => {
  let component: HomeEuBlogThirtyOneComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
