import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

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
  

}
