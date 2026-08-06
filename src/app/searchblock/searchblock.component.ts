 
import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchServiceService } from '../servises/search-service.service';
import { artickle } from '../servises/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchblock',
  templateUrl: './searchblock.component.html',
  styleUrls: ['./searchblock.component.scss'],
})
export class SearchblockComponent implements OnInit {
  @Output() closeBlockChild: EventEmitter<void> = new EventEmitter();
  @Output() focusEvent: EventEmitter<void> = new EventEmitter();
   @Input() maxResults: number = 5; // теперь Angular будет знать про этот input
  searchControl: FormControl = new FormControl('');
  myForm!: FormGroup;
  searchText: string = '';
  language!: number;
  displayedArticles: artickle[] = [];
 

  constructor(
    private searchservic: SearchServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      searchControl: this.searchControl,
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.language = this.searchservic.checkLange;
        this.searchText = value || '';
        this.searchservic.updateSearch(value || '');

        this.searchservic.filteredArticles$.subscribe((res) => {
          this.displayedArticles = res.slice(0, this.maxResults);
        });

        // если поле пустое — показываем 5 случайных статей
        if (!value) {
          const shuffled = [...this.searchservic.artikles].sort(
            () => Math.random() - 0.5
          );
          this.displayedArticles = shuffled.slice(0, this.maxResults);
        }
      });
  }

  onFocus() {
    this.focusEvent.emit();
    // при фокусе если поле пустое — показываем 5 случайных статей
    if (!this.searchControl.value) {
      const shuffled = [...this.searchservic.artikles].sort(
        () => Math.random() - 0.5
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.closeBlockChild.emit();
    }, 150);
  }

  clearInp() {
    this.searchControl.setValue('');
  }

  navigateToArticle(path: string) {
    this.router.navigate([path]);
    this.clearInp();
  }

  highlightText(title: string): string {
    if (!this.searchText || !title) return title;
    const regex = new RegExp(this.searchText, 'gi');
    return title.replace(regex, (match) => `<strong>${match}</strong>`);
  }
}
