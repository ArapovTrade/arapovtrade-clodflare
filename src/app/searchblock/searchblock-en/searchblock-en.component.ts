import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';
import { SearchServiceService } from '../../servises/search-service.service';
import { artickle } from '../../servises/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchblock-en',
  templateUrl: './searchblock-en.component.html',
  styleUrl: './searchblock-en.component.scss'
})
export class SearchblockEnComponent {
constructor(
    private searchservic: SearchServiceService,
    private cdr: ChangeDetectorRef,
        private router: Router,
    
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.language = this.searchservic.checkLange;
        this.searchText = value || '';
        this.searchservic.updateSearch(value || '');
      });
  }

  @Output() closeBlockChild: EventEmitter<Event> = new EventEmitter();

  language!: number;
  searchText: string = '';
  myForm!: FormGroup;
  searchControl: FormControl = new FormControl('');
  filteredArr: Observable<artickle[]> = this.searchservic.filteredArticles$;
  placeholderText: string = 'ррррррр';
  ngOnInit(): void {
    this.myForm = new FormGroup({
      searchControl: this.searchControl,
    });
  }

  clearInp() {
    this.searchControl.setValue('');
  }
  closeBtn() {
    this.clearInp();
    this.closeBlockChild.emit();
  }

  highlightText(title: string): string {
    if (!this.searchText || !title) return title; // Если нет текста поиска или заголовка, возвращаем оригинал

    const regex = new RegExp(this.searchText, 'gi'); // 'gi' - регистронезависимый поиск
    return title.replace(regex, (match) => `<strong>${match}</strong>`); // Оборачиваем совпадения в <strong>
  }

  ngAfterViewChecked() {
    this.placeholderText =
      this.searchservic.checkLange == 1
        ? 'Наприклад :  "Рівні Фібоначчі"'
        : this.searchservic.checkLange == 2
        ? 'Например : "Метод Вайкоффа"'
        : 'For example : "Smart Money"';
    this.cdr.detectChanges();
  }
   navigateToArticle(path: any) {
    
    this.router.navigate([path]);
  }
}
