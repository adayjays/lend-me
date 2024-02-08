import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'borrow',
    loadChildren: () => import('./pages/borrow/borrow.module').then( m => m.BorrowPageModule)
  },
  {
    path: 'lend',
    loadChildren: () => import('./pages/lend/lend.module').then( m => m.LendPageModule)
  },
  {
    path: 'lend-options',
    loadChildren: () => import('./pages/lend-options/lend-options.module').then( m => m.LendOptionsPageModule)
  },
  {
    path: 'borrow-options',
    loadChildren: () => import('./pages/borrow-options/borrow-options.module').then( m => m.BorrowOptionsPageModule)
  },
  {
    path: 'borrow-item',
    loadChildren: () => import('./pages/borrow-item/borrow-item.module').then( m => m.BorrowItemPageModule)
  },
  {
    path: 'lend-item',
    loadChildren: () => import('./pages/lend-item/lend-item.module').then( m => m.LendItemPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
