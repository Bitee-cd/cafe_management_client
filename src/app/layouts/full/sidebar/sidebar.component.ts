import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from 'src/app/shared/main-menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery : MediaQueryList;
  private _mobileQueryListener: () => void;
  userRole:any;
  token:any = localStorage.getItem('token')
  tokenPayload:any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media:MediaMatcher,
    public menuItems:MenuItems
    ) {
      this.tokenPayload=jwtDecode(this.token)
      this.userRole = this.tokenPayload?.role
      this.mobileQuery = media.matchMedia('(min-width:760px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnDestroy(): void {}
}
