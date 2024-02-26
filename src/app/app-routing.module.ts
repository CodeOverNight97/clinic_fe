import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './modules/_layout/app.layout.component';
import { AuthGuard } from './_core/helper';
import { NotfoundComponent } from './modules/component/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: "/quan-ly-kiem-ke", pathMatch: "full" },
  {
    path: '', component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'quan-ly-kiem-ke', loadChildren: () => import('./modules/component/quan-ly-kiem-ke/quan-ly-kiem-ke.module').then(m => m.QuanLyKiemKeModule) },
      { path: 'bao-cao-thong-ke', loadChildren: () => import('./modules/component/bao-cao-thong-ke/bao-cao-thong-ke.module').then(m => m.BaoCaoThongKeModule) },
      { path: 'quan-tri', loadChildren: () => import('./modules/component/quan-tri/quan-tri.module').then(m => m.QuanTriModule) },
    ],
  },
  { path: 'auth', loadChildren: () => import('./modules/_auth/auth.module').then(m => m.AuthModule) },
  { path: 'pages/notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'pages/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
