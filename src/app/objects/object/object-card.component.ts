import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss']
})
export class ObjectCardComponent implements OnInit {

  @Input()
  object;

  constructor() { }

  ngOnInit(): void {
  }

}
