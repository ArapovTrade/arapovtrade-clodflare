import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyEightComponent } from './home-eu-blog-thirty-eight.component';

describe('HomeEuBlogThirtyEightComponent', () => {
  let component: HomeEuBlogThirtyEightComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
