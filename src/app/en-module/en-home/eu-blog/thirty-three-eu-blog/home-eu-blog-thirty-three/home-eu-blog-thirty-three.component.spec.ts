import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyThreeComponent } from './home-eu-blog-thirty-three.component';

describe('HomeEuBlogThirtyThreeComponent', () => {
  let component: HomeEuBlogThirtyThreeComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
