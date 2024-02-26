import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MenuBarLeftModel } from '../../menu-bar-left/menu-bar-left/menu-bar-left.models/menu-bar-left.model';
import { SseService } from 'src/app/_core/helper/SSE.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout-bao-cao-thong-ke',
  // standalone: true,
  // imports: [
  //   CommonModule,
  // ],
  templateUrl: './layout-bao-cao-thong-ke.component.html',
  styleUrls: ['./layout-bao-cao-thong-ke.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBaoCaoThongKeComponent implements OnInit {
  itemMenuBarLeft: MenuBarLeftModel[]
  private sseSubscription: Subscription;
  constructor(private sseService: SseService) {
    this.itemMenuBarLeft = [
      new MenuBarLeftModel("Báo cáo chi tiết tài sản", "bao-cao-thong-ke/bao-cao-chi-tiet-tai-san", "pi pi-chart-bar", 0, true),
      new MenuBarLeftModel("Báo cáo thay đổi dữ liệu", "bao-cao-thong-ke/bao-cao-thay-doi-du-lieu", "pi pi-chart-bar", 1, false),
      new MenuBarLeftModel("Báo cáo kết nhập dữ liệu", "bao-cao-thong-ke/bao-cao-ket-nhap-du-lieu", "pi pi-chart-bar", 2, false),
      new MenuBarLeftModel("Báo cáo kết xuất kiểm kê", "bao-cao-thong-ke/bao-cao-ket-xuat-du-lieu", "pi pi-chart-bar", 3, false),
      new MenuBarLeftModel("Báo cáo kết nhập kiểm kê", "bao-cao-thong-ke/bao-cao-ket-nhap-kiem-ke", "pi pi-chart-bar", 4, false),
    ]
  }
  ngOnInit(): void {
    this.itemMenuBarLeft[0].isActive = true;
  //   console.log('SSE')
  //   const eventSource = new EventSource(`${environment.apiBaseUrl}api/quantri/SSE`);
  //   eventSource.onmessage = (event) => {
  //     console.log(event.data);
  //   };
  }

}
