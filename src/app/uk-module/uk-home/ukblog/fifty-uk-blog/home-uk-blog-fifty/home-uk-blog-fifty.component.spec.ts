import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyComponent } from './home-uk-blog-fifty.component';

describe('HomeUkBlogFiftyComponent', () => {
  let component: HomeUkBlogFiftyComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
