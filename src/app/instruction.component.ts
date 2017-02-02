//angular modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

//async library
import 'rxjs/add/operator/switchMap';
//async data service
import { InstructionService } from './instruction.service';

//data models
import { Instruction } from './instruction';
import { Step } from './step';


@Component({
  //moduleId: module.id,
  selector: 'instruction',
  templateUrl: './instruction.component.html',
  //styleUrls: ['./instruction.component.css']
})


export class InstructionComponent implements OnInit{
  steps: Step[];
  instruction: Instruction;

  constructor(
    private instructionService: InstructionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getInstruction();
  }

  getInstruction(): void {
    this.route.params
      .switchMap((params: Params) => this.instructionService.getInstruction(params['id']))
      .subscribe(instruction => this.instruction = instruction);
  }
}
