import { Component ,OnInit} from '@angular/core';
declare var $ : any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fayaz';
  constructor(){ }

  ngOnInit() {
    console.log('hi');
    $('.cbtn').click(function(){
       console.log('cliked');
    })
  }


  onButtonClick(){
    this.title = 'Afsha';
  }
}

