import { Step } from './step';

export class Instruction {
  _id: string;
  title: string;
  description: string;
  steps: Step[];

  constructor() {
    this._id = '';
    this.title = '';
    this.description = '';
    this.steps = [new Step()];
  }
}
