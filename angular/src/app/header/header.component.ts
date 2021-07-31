import {Component, OnInit} from '@angular/core';
import {DialogService} from '../services/dialog.service';
import {FacadeService} from '../services/facade.service';

@Component({
  // providers: [DialogService],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    public facade: FacadeService,
  ) {
  }

  ngOnInit(): void {
  }

  onClickAdd(): void {
    this.dialogService.createItemDialog();
  }
}
