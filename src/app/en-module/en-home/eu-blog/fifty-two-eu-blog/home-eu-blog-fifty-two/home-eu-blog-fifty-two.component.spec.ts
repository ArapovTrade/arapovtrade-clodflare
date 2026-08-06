import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyTwoComponent } from './home-eu-blog-fifty-two.component';

describe('HomeEuBlogFiftyTwoComponent', () => {
  let component: HomeEuBlogFiftyTwoComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
