import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyFourComponent } from './home-eu-blog-thirty-four.component';

describe('HomeEuBlogThirtyFourComponent', () => {
  let component: HomeEuBlogThirtyFourComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
