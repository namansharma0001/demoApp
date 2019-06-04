import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {AngularTokenService} from "angular-token";



import { map } from 'rxjs/operators';
@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css']
})

export class LogicComponent  implements OnInit{
  loginForm: FormGroup;
  characterCountLeft$;
  maxCharCount = 280;

  constructor(private fb: FormBuilder,
    private tokenService: AngularTokenService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  login(){
    console.log(this.loginForm.value);
    var formValues= this.loginForm.value
    this.tokenService.signIn({
      login:                formValues.email,
      password:             formValues.password,
  }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
  );
  }
//   onSubmit(){
  
//     // here you make ajax request using http client
//  }
}