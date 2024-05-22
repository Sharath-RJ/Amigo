import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css'],
})
export class VideocallComponent implements OnInit, AfterViewInit {
  roomId!: string;

  constructor(private _route: ActivatedRoute) {}

  @ViewChild('root', { static: true }) root!: ElementRef;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.roomId = params['roomId'];
      console.log(this.roomId);
    });
  }

  ngAfterViewInit(): void {
    const appID = 796494173; // Replace with your actual appID
    const serverSecret = '12bf1885a7a04712777878d75dc4fe86'; // Replace with your actual serverSecret
    const userID = 'UGD'; // Replace with a unique user ID
    const userName = `User_${Date.now()}`; // Replace with a unique user name or another identifier

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      this.roomId,
      userID,
      userName
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start a one-on-one call.
    zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${this.roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // Set to one-on-one call
      },
    });
  }
}
