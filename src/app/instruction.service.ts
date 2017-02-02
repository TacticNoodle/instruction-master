import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Instruction } from './instruction';


@Injectable()
export class InstructionService {
  private instructionsUrl = '/api/instructions';  // URL to web api

  constructor (private http: Http) {}

  getAllInstructions(): Observable<Instruction[]> {
    let url = `${this.instructionsUrl}`;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getInstruction(id: string): Observable<Instruction> {
    let url = `${this.instructionsUrl}/${id}`;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  search(searchString: string): Observable<Instruction[]> {
    let url = `${this.instructionsUrl}/query/${searchString}`;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  //format: application/json
  createInstruction(instruction: Instruction): Observable<Instruction> {
    let url = `${this.instructionsUrl}`;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});
    let body = JSON.stringify(instruction);
    /*let body: string = `{"title": "Posting2REAL", "description": "Laaangweiliger!",
      "steps": [{"description": "Lampe1st Nicht schon wieder Sonderfahrt",
                  "picture": ""}]}`*/

    return this.http.post(this.instructionsUrl, body , options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  //format: multipart
  addInstruction(instruction: Instruction): Observable<Instruction> {
    let url = `${this.instructionsUrl}`;
    let headers = new Headers({ 'Content-Type': ''});
    let options = new RequestOptions({ headers: headers});
    let formData = new FormData();

    formData.append('instructionTitle', instruction.title);
    formData.append('instructionDescription', instruction.description);
    for (let i in instruction.steps) {
      formData.append('step_picture', instruction.steps[i].picture);
      formData.append('step_description', instruction.steps[i].description);
    }

    return this.http.post(this.instructionsUrl, formData , /*options*/)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteInstruction(id: string): Observable<Instruction> {
    let url = `${this.instructionsUrl}/${id}`;
    return this.http.delete(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(response: Response) {
    return response.json();
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
