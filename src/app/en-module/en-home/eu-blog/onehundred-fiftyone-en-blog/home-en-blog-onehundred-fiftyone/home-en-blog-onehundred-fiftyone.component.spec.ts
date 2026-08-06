import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftyoneComponent } from './home-en-blog-onehundred-fiftyone.component';

describe('HomeEnBlogOnehundredFiftyoneComponent', () => {
  let component: HomeEnBlogOnehundredFiftyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
