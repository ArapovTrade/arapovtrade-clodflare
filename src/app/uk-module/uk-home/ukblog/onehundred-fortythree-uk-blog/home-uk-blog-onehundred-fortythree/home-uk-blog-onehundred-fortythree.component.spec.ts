import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortythreeComponent } from './home-uk-blog-onehundred-fortythree.component';

describe('HomeUkBlogOnehundredFortythreeComponent', () => {
  let component: HomeUkBlogOnehundredFortythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
