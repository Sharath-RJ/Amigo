import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len:any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrl: './live-stream.component.css',
})
export class LiveStreamComponent {
  @ViewChild('root') root!: ElementRef;

  ngAfterViewInit() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const userID = randomID(5);
    const userName = randomID(5);
    let role_str = getUrlParams(window.location.href).get('role') || 'Host';
    const role =
      role_str === 'Host'
        ? ZegoUIKitPrebuilt.Host
        : role_str === 'Cohost'
        ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;

    let sharedLinks:any[]=[];
    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
      sharedLinks.push({
        name: 'Join as co-host',
        url:
          window.location.origin +
          window.location.pathname +
          '?roomID=' +
          roomID +
          '&role=Cohost',
      });
    }
    sharedLinks.push({
      name: 'Join as audience',
      url:
        window.location.origin +
        window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Audience',
    });

    // generate token
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      console.log(
        'this.root.nativeElement',
        this.root.nativeElement.clientWidth
      );
      // start the call
      zp.joinRoom({
        container: this.root.nativeElement,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
      });
    });
  }
}
