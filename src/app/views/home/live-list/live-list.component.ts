import { Component, OnInit } from '@angular/core';
import {Lives} from '../../../shared/model/live.model';
import {LiveService} from '../../../shared/service/live.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {


  public livesPrevious: Lives[] = [];
  public livesNext: Lives[] = [];
  public next = false;
  public previous = false;
  constructor(
    private liveService: LiveService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getLives();
  }


  private dataParseSanitizer(array: Lives[]): Lives[] {
    return array.map((val: Lives) => {
      val.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(val.liveLink);
      return val;
    });
  }

  public getLives(): void {
    this.liveService.getLivesWithFlag('previous')
      .subscribe(
        data => {
          this.livesPrevious = this.dataParseSanitizer(data.content);
          this.previous = true;
        }
      );

    this.liveService.getLivesWithFlag('next')
      .subscribe(
        data => {
          this.livesNext = this.dataParseSanitizer(data.content);
          this.next = true;
        }
      );
  }

}
