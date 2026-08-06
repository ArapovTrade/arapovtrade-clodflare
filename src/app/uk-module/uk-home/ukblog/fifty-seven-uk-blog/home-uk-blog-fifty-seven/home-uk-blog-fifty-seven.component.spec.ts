import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftySevenComponent } from './home-uk-blog-fifty-seven.component';

describe('HomeUkBlogFiftySevenComponent', () => {
  let component: HomeUkBlogFiftySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
