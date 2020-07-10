import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() clickFavorite: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  favoriteClicked() {
    this.clickFavorite.emit();
  }


}
