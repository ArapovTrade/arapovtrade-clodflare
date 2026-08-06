import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyEightComponent } from './home-uk-blog-fifty-eight.component';

describe('HomeUkBlogFiftyEightComponent', () => {
  let component: HomeUkBlogFiftyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
