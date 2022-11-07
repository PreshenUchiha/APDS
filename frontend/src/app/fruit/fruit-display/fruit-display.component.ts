import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FruitServiceService } from '../fruit-service.service';


@Component({
  selector: 'app-fruit-display',
  templateUrl: './fruit-display.component.html',
  styleUrls: ['./fruit-display.component.css']
})
export class FruitDisplayComponent implements OnInit {

  fruits:{_id:string,id:string,name:string, __v:string}[] = [];


  constructor(public fruitservice: FruitServiceService) { }
  private fruitsubscription!: Subscription;
  ngOnInit(){
    this.fruitservice.getfruit_service();
    this.fruitsubscription = this.fruitservice.getUpdateListener()
    .subscribe((fruits:{_id:string,id:string,name:string, __v:string}[])=>
    {
      this.fruits = fruits;
    });
  }

  ngOnDestroy()
  {
    this.fruitsubscription.unsubscribe();
  }

  ondelete(fruitid: string){
    this.fruitservice.deletefruit_service(fruitid)
  }
}
