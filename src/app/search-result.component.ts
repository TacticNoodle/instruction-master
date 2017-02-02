import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { InstructionService } from './instruction.service';

import { Instruction } from './instruction'


@Component({
  //moduleId: module.id,
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  //styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit{
  instructions: Instruction[];

  constructor(
    private instructionService: InstructionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.route.params
      .switchMap((params: Params) => this.instructionService.search(params['query']))
      .subscribe(instructions => this.instructions = instructions);
  }
}
