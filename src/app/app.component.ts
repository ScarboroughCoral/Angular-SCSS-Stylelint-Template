import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { user } from '@ybc/client-api';
import { browser, appWindow, camera } from '../../../../workspace/ada-gaia-infrastructure/packages/ybc-client-api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-scss-stylelint-template';

  @ViewChild('t') canvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('btn') btn?: ElementRef<HTMLButtonElement>;
  @ViewChild('img') image?: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    import('@silvia-odwyer/photon').then((photon) => {
      if (this.canvas && this.btn && this.image) {
        const btn = this.btn.nativeElement;
        const canvas = this.canvas.nativeElement;
        let ctx = canvas.getContext("2d");
        btn.addEventListener('click', (e) => {
          // Draw the image element onto the canvas
          ctx.drawImage(this.image.nativeElement, 0, 0);

          // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
          let image = photon.open_image(canvas, ctx);

          // Filter the image, the PhotonImage's raw pixels are modified
          photon.swap_channels(image,0,1)

          // Place the modified image back on the canvas
          photon.putImageData(canvas, ctx, image);
        })
      }
    });
  }
  async open() {
    try {
      await browser.browserOpen('test')
      console.log('ok')
    } catch (error) {
      console.log('err')
      console.error(error)
    }
  }
  async capture() {
    try {
      const result = await camera.capture()
      console.log('capture ok', result)
    } catch (error) {
      console.error('capture error', error)
    }
  }
  resize() {
    appWindow.beforeClose(() => {
      console.log('lmy===resize')
    })
  }
  async signout() {
    await user.logout()
  }
}
