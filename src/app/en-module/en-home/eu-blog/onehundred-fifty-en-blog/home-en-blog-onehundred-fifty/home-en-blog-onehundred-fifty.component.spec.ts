import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftyComponent } from './home-en-blog-onehundred-fifty.component';

describe('HomeEnBlogOnehundredFiftyComponent', () => {
  let component: HomeEnBlogOnehundredFiftyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
