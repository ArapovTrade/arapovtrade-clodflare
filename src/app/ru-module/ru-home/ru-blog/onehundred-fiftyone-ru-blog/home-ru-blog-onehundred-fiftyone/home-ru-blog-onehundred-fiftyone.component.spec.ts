import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftyoneComponent } from './home-ru-blog-onehundred-fiftyone.component';

describe('HomeRuBlogOnehundredFiftyoneComponent', () => {
  let component: HomeRuBlogOnehundredFiftyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
