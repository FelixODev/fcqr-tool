import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QrResolver } from './resolvers/qr.resolver';

const routes: Routes = [
  {
    path: 'c',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'c/:qr_id',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    resolve: { qr: QrResolver }
  },
  {
    path: '',
    redirectTo: 'c',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'c',
    pathMatch: 'full'
  },
  {
    path: 'home/:qr_id',
    redirectTo: 'c/:qr_id',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
