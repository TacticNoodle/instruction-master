import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { InstructionService } from './instruction.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  //styleUrls: ['./starter-template.css']
})

export class TopBarComponent {
  showSearch: boolean;

  constructor(
    private router: Router
  ) { }

  onSearch(searchString: string): void {
    let link = ['/search-result', searchString];
    this.router.navigate(link);
  }
}
