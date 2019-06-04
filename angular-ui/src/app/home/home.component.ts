import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {AngularTokenService} from "angular-token";



import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// export class HomeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

export class HomeComponent  implements OnInit{
  signUpGroup: FormGroup;
  characterCountLeft$;
  maxCharCount = 280;
  latitude: number;
  longitude: number;
  zoom:number;
 

  constructor(private fb: FormBuilder,
    private tokenService: AngularTokenService) {

    this.signUpGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    //Second Parameter
     {
       validator: passwordMatch
     });
  }
  ngOnInit() {
    this.setCurrentLocation();

  }
  login(){

    if(this.latitude && this.longitude){
      var formValues= this.signUpGroup.value
      this.tokenService.registerAccount({
        login:                formValues.email,
        password:             formValues.password,
        passwordConfirmation: formValues.confirmPassword,
        lat : this.latitude.toString(),
        lng:this.longitude.toString()
       }).subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
      );
    }else{
      alert("Please add location!")
    }

    
   
  }
  markerDragEnd(event:any = MouseEvent) {
    var coords = event.coords
    this.latitude = coords.lat;
    this.longitude = coords.lng;
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
}


function passwordMatch(formGroup: FormGroup): ValidationErrors | undefined {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if(passwordControl.value === confirmPasswordControl.value){
    return null;      
  } else {
    return {
      passwordMatch: true
    }
  }
    
}

