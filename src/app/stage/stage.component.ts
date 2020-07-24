import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ControllerService } from '../services/controller.service';
import { CharacterComponent } from '../character/character.component'

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  userID: string;

  constructor(
    private fbService: FirebaseService,
    private character: CharacterComponent,
    private controller: ControllerService
  ) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID');
    if (!this.userID) {
      const user = this.fbService.addNewCharacter(0)
          .then(ref => {
            this.userID = ref.key;
            localStorage.setItem('userID', this.userID);
          })
    }

    const FRAME_DURATION = (1/60) * 1000;
    const loop = window.setInterval(() => {
      window.requestAnimationFrame(() => {
        if (!this.controller.input.has('L') &&
            !this.controller.input.has('R')) {
              // this.character.idle();
        }

        if (this.controller.input.has('L')) {
          this.character.moveLeft(); 
        }
      
        if (this.controller.input.has('R')) {
          this.character.moveRight();
        }

        if (this.controller.input.has('U')) {
          this.character.moveUp(); 
        }
      
        if (this.controller.input.has('D')) {
          this.character.moveDown();
        }

        // if (controller.input.has('S_L')) {
        //   this.character.shootLeftArm();
        // } else {
        //   this.character.lowerLeftArm();
        // }

        // if (controller.input.has('S_R')) {
        //   this.character.shootRightArm();
        // } else {
        //   this.character.lowerRightArm();
        // }
      });
    }, FRAME_DURATION);
  }

}
