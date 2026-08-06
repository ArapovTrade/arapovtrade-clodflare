import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyEightComponent } from './home-eu-blog-fifty-eight.component';

describe('HomeEuBlogFiftyEightComponent', () => {
  let component: HomeEuBlogFiftyEightComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
