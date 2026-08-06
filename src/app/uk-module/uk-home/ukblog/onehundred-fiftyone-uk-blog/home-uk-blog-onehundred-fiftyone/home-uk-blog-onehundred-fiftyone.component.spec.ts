import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftyoneComponent } from './home-uk-blog-onehundred-fiftyone.component';

describe('HomeUkBlogOnehundredFiftyoneComponent', () => {
  let component: HomeUkBlogOnehundredFiftyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
