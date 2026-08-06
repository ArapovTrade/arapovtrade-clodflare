import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyThreeComponent } from './home-eu-blog-fifty-three.component';

describe('HomeEuBlogFiftyThreeComponent', () => {
  let component: HomeEuBlogFiftyThreeComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
