import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { InstructionService } from './instruction.service';

import { Instruction } from './instruction'


@Component({
  //moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  //styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit{
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
      .switchMap((params: Params) => this.instructionService.getAllInstructions())
      .subscribe(instructions => this.instructions = instructions);
  }

  onClickFavorite(event, i): void {

  }

  onClickEdit(event, i): void {

  }

  onClickDelete(event, i): void {
    this.instructionService.deleteInstruction(this.instructions[i]._id)
                           .subscribe(r => {});

    this.instructions.splice(i, 1);
  }
}
