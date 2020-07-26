import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})

export class CharacterComponent implements OnInit {

  userID: string;
  facing: string;
  posY: number;
  posX: number;
  strPosY: string;
  strPosX: string;
  leftArmRotation: number;
  rightArmRotation: number;
  stageHeight: number;
  stageWidth: number;
  armNum: number;
  legNum: number;
  zIndex: number;
  scale: number;
  isClapping: boolean;

  constructor(private fbService: FirebaseService) {
    this.stageHeight = 1000;
    this.stageWidth = 1000;
    this.leftArmRotation = 0;
    this.rightArmRotation = 0;
    this.posY = this.stageWidth / 2;
    this.posX = this.stageHeight / 2;
    this.userID = localStorage.getItem('userID');
    this.zIndex = 0;
    this.scale = 1;


    this.fbService.getCharacter(0, this.userID).on('value', (snapshot) => {
      const charData = snapshot.val();

      if (charData.y) {
        this.posY = charData.y;
      }

      if (charData.x) {
        this.posX = charData.x;
      }

      if (!charData.armNum) {
        this.fbService.setArmType(0, this.userID, this.getRandomPart());
      } else {
        this.armNum = charData.armNum;  
      }

      if (!charData.legNum) {
        this.fbService.setLegType(0, this.userID, this.getRandomPart());
      } else {
        this.legNum = charData.legNum;  
      }
      
      this.facing = charData.facing;
      this.leftArmRotation = charData.leftArmRotation;
      this.rightArmRotation = charData.rightArmRotation;
      
      this.legNum = charData.legNum;

      this.strPosX = `${this.posX}px`;
      this.strPosY = `${this.posY}px`;
      this.scale = this.getScale();

      this.zIndex = this.posY;
    })
  }

  ngOnInit(): void {

  }

  getRandomPart() {
    return Math.floor(Math.random() * 4) + 1;    
  }

  getScale() {
    let curY = this.posY;
    let percentage = this.posY / 1000;
    if (curY < 0) {
      curY = 0;
    }
    return (percentage * .5) + .5;
  }

  moveLeft() {
    let curX = this.posX;
    curX -= 25;
    if (curX <= 0) {
      curX = 0;
    }
    this.fbService.updateCharacterDataX(0, this.userID, curX);
    this.fbService.updateCharacterFacing(0, this.userID, 'left');
  }

  moveRight() {
    let curX = this.posX;
    curX += 25;
    if (curX >= 1920) {
      curX = 1920;
    }
    this.fbService.updateCharacterDataX(0, this.userID, curX);
    this.fbService.updateCharacterFacing(0, this.userID, 'right');
  }

  moveDown() {
    let curY = this.posY;
    curY += 25;
    if (curY >= 1080) {
      curY = 1080;
    }
    this.fbService.updateCharacterDataY(0, this.userID, curY);
  }

  moveUp() {
    let curY = this.posY;
    curY -= 25;
    if (curY <= 0) {
      curY = 0;
    }
    this.fbService.updateCharacterDataY(0, this.userID, curY);
  }

  idle() {
    this.fbService.updateCharacterFacing(0, this.userID, 'idle');
  }

  shootLeftArm() {
    const rotationMin = 20;
    const rotationMax = 230;
    const rate = 50;

    this.leftArmRotation += rate;
    if (this.leftArmRotation >= rotationMax) {
      this.leftArmRotation = rotationMax;
    } else if (this.leftArmRotation <= rotationMin) {
      this.leftArmRotation = rotationMin;
    } 

    this.fbService.updateCharacterDataLAR(0, this.userID, this.leftArmRotation);
  }

  shootRightArm() {
    const rotationMin = -20;
    const rotationMax = -230;
    const rate = -50;

    this.rightArmRotation += rate;
    if (this.rightArmRotation <= rotationMax) {
      this.rightArmRotation = rotationMax;
    } else if (this.rightArmRotation >= rotationMin) {
      this.rightArmRotation = rotationMin;
    }   

    this.fbService.updateCharacterDataRAR(0, this.userID, this.rightArmRotation);
  }

  lowerLeftArm() {
    const rotationMin = 20;
    const rotationMax = 230;
    const rate = 50;

    this.leftArmRotation -= rate;
    if (this.leftArmRotation >= rotationMax) {
      this.leftArmRotation = rotationMax;
    } else if (this.leftArmRotation <= rotationMin) {
      this.leftArmRotation = rotationMin;
    } 

    this.fbService.updateCharacterDataLAR(0, this.userID, this.leftArmRotation);
  }

  lowerRightArm() {
    const rotationMin = -20;
    const rotationMax = -230;
    const rate = -50;

    this.rightArmRotation -= rate;
    if (this.rightArmRotation <= rotationMax) {
      this.rightArmRotation = rotationMax;
    } else if (this.rightArmRotation >= rotationMin) {
      this.rightArmRotation = rotationMin;
    } 

    this.fbService.updateCharacterDataRAR(0, this.userID, this.rightArmRotation);
  }
}
