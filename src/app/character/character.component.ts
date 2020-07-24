import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  userID: string;
  walkingDirection: string;
  posY: number;
  posX: number;
  strPosY: string;
  strPosX: string;
  leftArmRotation: number;
  rightArmRotation: number;

  constructor(private fbService: FirebaseService) { 
    this.userID = localStorage.getItem('userID');
    this.fbService.getCharacter(0, this.userID).on('value', (snapshot) => {
      const charData = snapshot.val();
      this.posY = charData.y;
      this.posX = charData.x;

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
  }

  moveRight() {
    let curX = this.posX;
    curX += 10;
    if (curX >= 1920) {
      curX = 1920;
    }
    this.fbService.updateCharacterDataX(0, this.userID, curX);
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
}
