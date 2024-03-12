import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/home/home.module').then(
            (m) => m.HomePageModule
          ),
      },
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
      {
        path: 'notifications/:id',
        loadChildren: () => import('../pages/notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'borrow',
        loadChildren: () => import('../pages/borrow/borrow.module').then( m => m.BorrowPageModule)
      },
      {
        path: 'lend',
        loadChildren: () => import('../pages/lend/lend.module').then( m => m.LendPageModule)
      },
      {
        path: 'borrow-options',
        loadChildren: () => import('../pages/borrow-options/borrow-options.module').then( m => m.BorrowOptionsPageModule)
      },
      {
        path: 'borrow-item',
        loadChildren: () => import('../pages/borrow-item/borrow-item.module').then( m => m.BorrowItemPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../pages/chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'notification/:id',
        loadChildren: () => import('../pages/notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'lend-item',
        loadChildren: () => import('../pages/lend-item/lend-item.module').then( m => m.LendItemPageModule),
        
      },
    {
        path: 'borrow-requests',
        loadChildren: () => import('../pages/borrow-requests/borrow-requests.module').then( m => m.BorrowRequestsPageModule)
      }
      
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
