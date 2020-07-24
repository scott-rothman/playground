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

  constructor(private fbService: FirebaseService) {
    this.leftArmRotation = 0;
    this.rightArmRotation = 0;
    this.userID = localStorage.getItem('userID');
    this.fbService.getCharacter(0, this.userID).on('value', (snapshot) => {
      const charData = snapshot.val();
      this.posY = charData.y;
      this.posX = charData.x;
      this.facing = charData.facing;
      this.leftArmRotation = charData.leftArmRotation;
      this.rightArmRotation = charData.rightArmRotation;

      this.strPosX = `${this.posX}px`;
      this.strPosY = `${this.posY}px`;
    })
  }

  ngOnInit(): void {

  }

  moveLeft() {
    let curX = this.posX;
    curX -= 10;
    if (curX <= 0) {
      curX = 0;
    }
    this.fbService.updateCharacterDataX(0, this.userID, curX);
    this.fbService.updateCharacterFacing(0, this.userID, 'left');
  }

  moveRight() {
    let curX = this.posX;
    curX += 10;
    if (curX >= 1920) {
      curX = 1920;
    }
    this.fbService.updateCharacterDataX(0, this.userID, curX);
    this.fbService.updateCharacterFacing(0, this.userID, 'right');
  }

  moveDown() {
    let curY = this.posY;
    curY += 10;
    if (curY >= 1080) {
      curY = 1080;
    }
    this.fbService.updateCharacterDataY(0, this.userID, curY);
  }

  moveUp() {
    let curY = this.posY;
    curY -= 10;
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
    const rotationMax = 150;
    const rate = 5;

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
    const rotationMax = -150;
    const rate = -5;

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
    const rotationMax = 150;
    const rate = 5;

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
    const rotationMax = -150;
    const rate = -5;

    this.rightArmRotation -= rate;
    if (this.rightArmRotation <= rotationMax) {
      this.rightArmRotation = rotationMax;
    } else if (this.rightArmRotation >= rotationMin) {
      this.rightArmRotation = rotationMin;
    } 

    this.fbService.updateCharacterDataRAR(0, this.userID, this.rightArmRotation);
  }
}
