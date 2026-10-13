import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { REPLIER_CONFIG, ReplierConfig } from './replier.config';

/**
 * Standalone setup:
 *   bootstrapApplication(AppComponent, {
 *     providers: [provideHttpClient(), provideReplier({ baseUrl: '/api/replier' })],
 *   });
 */
export function provideReplier(config: ReplierConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: REPLIER_CONFIG, useValue: config }]);
}
