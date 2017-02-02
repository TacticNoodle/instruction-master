import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { InstructionService } from './instruction.service';

import { Instruction } from './instruction';
import { Step } from './step';

@Component({
  selector: 'builder',
  templateUrl: './builder.component.html',
  //styleUrls: ['./builder.component.css']
})

export class BuilderComponent {
  instruction: Instruction;
  imageExist: boolean[];
  imageSources: any[];
  isDragOver: boolean[];

  formData: FormData = new FormData();

  constructor(
    private instructionService: InstructionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.instruction = new Instruction();
    this.imageExist = [];
    this.imageSources = [];
    this.isDragOver = [];
  }

  onClickAddStep(): void {
    this.instruction.steps.push(new Step());
  }

  //application form: json
  /*onClickFinish(): void {
    // Prevent conflict with mongoDB standard autoID.
    delete this.instruction['_id'];
    this.instructionService.createInstruction(this.instruction)
                           .subscribe(r => {});
  }*/

  //application form: multipart
  onClickSave(): void {
    // Prevent conflict with mongoDB standard autoID.
    delete this.instruction['_id'];
    this.instructionService.addInstruction(this.instruction)
                           .subscribe(r => {});
  }

  onClickAbort(): void {
    this.instruction = null;
    let link = ['/home'];
    this.router.navigate(link);
  }

  // Regular input element
  onImageChange(event, i): void {
    // Save to model
    let inputElement = event.target;
    let file: File = inputElement.files[0];
    this.instruction.steps[i].picture = file;

    // Preview with FileReader
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
      this.imageSources[i] = fileReader.result;
    }, false);

    // Activate preview element
    this.imageExist[i] = true;
  }

  // Drag and Drop fileupload
  setDragEnter(event, i): void {
    event.stopPropagation();
    event.preventDefault();
  }

  setDragOver(event, i): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragOver[i] = true;
  }

  setDragLeave(event, i): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragOver[i] = false;
  }

  setDrop(event, i): void {
    event.stopPropagation();
    event.preventDefault();

    // Save to model
    let dt = event.dataTransfer;
    let file = dt.files[0];
    this.instruction.steps[i].picture = file;

    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
      this.imageSources[i] = fileReader.result;
    }, false);

    this.imageExist[i] = true;
  }

}
