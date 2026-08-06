import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftyComponent } from './home-ru-blog-onehundred-fifty.component';

describe('HomeRuBlogOnehundredFiftyComponent', () => {
  let component: HomeRuBlogOnehundredFiftyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
