import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { Instruction } from './instruction';
import { InstructionService } from './instruction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./search-result.component.css'],
  providers: []
})

export class AppComponent {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);
  }

  setNoDragEnter(event, i): void {
    event.stopPropagation();
    event.preventDefault();
  }

  setNoDragOver(event, i): void {
    event.stopPropagation();
    event.preventDefault();
  }

  setNoDrop(event, i): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
