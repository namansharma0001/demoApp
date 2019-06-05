import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {AngularTokenService} from "angular-token";
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';



declare const google: any;




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit{
  signUpGroup: FormGroup;
  characterCountLeft$;
  maxCharCount = 280;
  latitude: number;
  longitude: number;
  zoom:number;
  map:any;
  origin;
  destination;
  coordinates=[];
  latTo;
  lngTo;
  dir = undefined;
  showDirections = true;
  resizeSub;

  
  // @ViewChild('myMap',{ read: true, static: false }) el:ElementRef;

  // @ViewChild('myMap', {static: true}) el: ElementRef;




 

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
//   ngAfterViewInit() {
    
//      console.log(this.el);
//      console.log("done");
//      if(this.el){
//       const mouseMoves = fromEvent(this.el._elem.nativeElement, 'mousemove');
//       const subscription = mouseMoves.
//       pipe(
//         debounceTime(200)
//       )
//      .subscribe((evt) => {
//        console.log(evt);
//       //  console.log("tukka")
//      })
//      }
    
   
// }
  
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

    // 
   
  }
  mapReady(map){
    this.map = map;
    var that = this;
    var overlay = new google.maps.OverlayView();
    overlay.draw = function() {};
    overlay.setMap(map)

    this.map.addListener('mousemove', function (e) {
      that.showDirections = false;
      console.log("now")
      // console.log(e.layerPoint);
     
      var projection = overlay.getProjection(); 
      var keys = Object.keys(e);
     
      var x, y;
      for (var i = 0; i < keys.length; i++) {
          if (MouseEvent.prototype.isPrototypeOf(e[keys[i]])) {
              x = e[keys[i]].clientX;
              y = e[keys[i]].clientY;
              var pixel = {x,y}

              // var a = projection.fromContainerPixelToLatLng(new google.maps.Point(x,y))

              var a = fromPixelToLatLng(pixel)
              console.log(a.lat())
             
              function fromPixelToLatLng (pixel) {
                var scale = Math.pow(2, that.map.getZoom());
                var proj = that.map.getProjection();
                var bounds = that.map.getBounds();
              
                var nw = proj.fromLatLngToPoint(
                  new google.maps.LatLng(
                    bounds.getNorthEast().lat(),
                    bounds.getSouthWest().lng()
                  ));
                var point = new google.maps.Point();
              
                point.x = pixel.x / scale + nw.x;
                point.y = pixel.y / scale + nw.y;
              
                return proj.fromPointToLatLng(point);
              }
              
              that.getDirection(a.lat(),a.lng())
          }
      }
  });
  
}

   
  getDirection(lat,lng) {
    
    this.latTo = lat;
    this.lngTo = lng;
    this.destination = undefined;
    this.destination = { lat: this.latTo, lng: this.lngTo }
    this.showDirections = true

 }
  onMouseOut(event:any = MouseEvent){
  
  }
  boundsChange(event){
    console.log("ahsadkasduas")
  }
  onMouseOver(infoWindow, gm) {
    
    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
    }
  
    gm.lastOpen = infoWindow;
  
    infoWindow.open();
  }
  centerChange(event){
    console.log(event)
    console.log("center change");
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
        // this.coordinates.push({lat:this.latitude,lng:this.longitude})
        this.origin = {lat:this.latitude,lng:this.longitude}
        this.destination = {lat:this.latitude,lng:this.longitude}

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

