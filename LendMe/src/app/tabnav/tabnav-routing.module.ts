import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('../pages/chats/chats.module').then(
            (m) => m.ChatsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () => import('../pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tabnav/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
