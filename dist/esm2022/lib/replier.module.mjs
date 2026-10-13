import { NgModule } from '@angular/core';
import { REPLIER_CONFIG } from './replier.config';
import * as i0 from "@angular/core";
/**
 * NgModule setup (for apps not using standalone bootstrap):
 *   imports: [HttpClientModule, ReplierModule.forRoot({ baseUrl: '/api/replier' })]
 */
export class ReplierModule {
    static forRoot(config) {
        return { ngModule: ReplierModule, providers: [{ provide: REPLIER_CONFIG, useValue: config }] };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ReplierModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: ReplierModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ReplierModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ReplierModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGllci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JlcGxpZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sa0JBQWtCLENBQUM7O0FBRWpFOzs7R0FHRztBQUVILE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakcsQ0FBQzsrR0FIVSxhQUFhO2dIQUFiLGFBQWE7Z0hBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFEekIsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJFUExJRVJfQ09ORklHLCBSZXBsaWVyQ29uZmlnIH0gZnJvbSAnLi9yZXBsaWVyLmNvbmZpZyc7XG5cbi8qKlxuICogTmdNb2R1bGUgc2V0dXAgKGZvciBhcHBzIG5vdCB1c2luZyBzdGFuZGFsb25lIGJvb3RzdHJhcCk6XG4gKiAgIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlLCBSZXBsaWVyTW9kdWxlLmZvclJvb3QoeyBiYXNlVXJsOiAnL2FwaS9yZXBsaWVyJyB9KV1cbiAqL1xuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFJlcGxpZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFJlcGxpZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFJlcGxpZXJNb2R1bGU+IHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogUmVwbGllck1vZHVsZSwgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBSRVBMSUVSX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9XSB9O1xuICB9XG59XG4iXX0=