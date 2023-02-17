import { LoaderComponent } from './atoms/loader/loader.component';
import { DialogComponent } from './molecules/dialog/dialog.component';
import { HeaderComponent } from './organisms/header/header.component';
import { FooterComponent } from './organisms/footer/footer.component';

export const components: any[] = [
  LoaderComponent,
  DialogComponent,  
  HeaderComponent,
  FooterComponent,
];

export * from './atoms/loader/loader.component';
export * from './molecules/dialog/dialog.component';
export * from './organisms/header/header.component';
export * from './organisms/footer/footer.component';
 