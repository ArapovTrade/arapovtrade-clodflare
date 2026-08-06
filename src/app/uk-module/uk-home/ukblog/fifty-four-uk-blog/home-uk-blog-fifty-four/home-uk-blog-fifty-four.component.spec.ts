import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyFourComponent } from './home-uk-blog-fifty-four.component';

describe('HomeUkBlogFiftyFourComponent', () => {
  let component: HomeUkBlogFiftyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
