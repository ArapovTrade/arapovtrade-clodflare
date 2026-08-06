import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyThreeComponent } from './home-uk-blog-fifty-three.component';

describe('HomeUkBlogFiftyThreeComponent', () => {
  let component: HomeUkBlogFiftyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
