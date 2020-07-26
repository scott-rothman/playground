import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-other-character',
  templateUrl: '../character/character.component.html',
  styleUrls: ['../character/character.component.scss']
})
export class OtherCharacterComponent implements OnInit {

  @Input() characterID: string;

  userID: string;
  facing: string;
  posY: number;
  posX: number;
  strPosY: string;
  strPosX: string;
  leftArmRotation: number;
  rightArmRotation: number;
  armNum: number;
  legNum: number;
  zIndex: number;
  scale: number;

  constructor(
    private fbService: FirebaseService
  ) { 
    
    
  }

  ngOnInit(): void {
    this.userID = this.characterID;
    if (this.userID) {
      this.fbService.getCharacter(0, this.userID).on('value', (snapshot) => {
        const charData = snapshot.val();
        this.posY = charData.y;
        this.posX = charData.x;
        this.facing = charData.facing;
        this.leftArmRotation = charData.leftArmRotation;
        this.rightArmRotation = charData.rightArmRotation;
        this.armNum = charData.armNum;
        this.legNum = charData.legNum;
  
        this.strPosX = `${this.posX}px`;
        this.strPosY = `${this.posY}px`;
      });
    }
  }

}
