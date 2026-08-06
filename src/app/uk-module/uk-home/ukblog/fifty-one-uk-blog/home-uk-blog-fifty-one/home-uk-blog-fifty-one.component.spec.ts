import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyOneComponent } from './home-uk-blog-fifty-one.component';

describe('HomeUkBlogFiftyOneComponent', () => {
  let component: HomeUkBlogFiftyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
