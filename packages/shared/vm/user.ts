import { ViewModel } from './base';

export interface User extends ViewModel {
  name: string;
  // avatar: AvatarModel;
}

export interface Avatar extends ViewModel {
  background: string;
  head: string;
  body: string;
}
