import { UserInterface } from './user.interface';
import { ProviderInterface } from './provider.interface';

export interface UserProviderInterface {
  id: number;
  user: UserInterface;        
  provider: ProviderInterface; 
  
}
