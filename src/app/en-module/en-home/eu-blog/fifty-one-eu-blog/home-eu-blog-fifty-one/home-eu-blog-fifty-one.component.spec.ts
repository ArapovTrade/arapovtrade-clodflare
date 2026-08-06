import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyOneComponent } from './home-eu-blog-fifty-one.component';

describe('HomeEuBlogFiftyOneComponent', () => {
  let component: HomeEuBlogFiftyOneComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
