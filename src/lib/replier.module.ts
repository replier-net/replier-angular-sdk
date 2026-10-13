import { ModuleWithProviders, NgModule } from '@angular/core';
import { REPLIER_CONFIG, ReplierConfig } from './replier.config';

/**
 * NgModule setup (for apps not using standalone bootstrap):
 *   imports: [HttpClientModule, ReplierModule.forRoot({ baseUrl: '/api/replier' })]
 */
@NgModule({})
export class ReplierModule {
  static forRoot(config: ReplierConfig): ModuleWithProviders<ReplierModule> {
    return { ngModule: ReplierModule, providers: [{ provide: REPLIER_CONFIG, useValue: config }] };
  }
}
