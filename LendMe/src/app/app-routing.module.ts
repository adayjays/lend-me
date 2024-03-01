import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'borrow',
    loadChildren: () => import('./pages/borrow/borrow.module').then( m => m.BorrowPageModule)
  },
  {
    path: 'lend',
    loadChildren: () => import('./pages/lend/lend.module').then( m => m.LendPageModule)
  },
  {
    path: 'borrow-options',
    loadChildren: () => import('./pages/borrow-options/borrow-options.module').then( m => m.BorrowOptionsPageModule)
  },
  {
    path: 'borrow-item',
    loadChildren: () => import('./pages/borrow-item/borrow-item.module').then( m => m.BorrowItemPageModule)
  },
  // {
  //   path: 'chats',
  //   loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)
  // },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  // {
  //   path: 'notifications',
  //   loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  // },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // },
  {
    path: 'lend-item',
    loadChildren: () => import('./pages/lend-item/lend-item.module').then( m => m.LendItemPageModule),
    
  },
  {
    path: 'tabnav',
    loadChildren: () => import('./tabnav/tabnav.module').then( m => m.TabnavPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
