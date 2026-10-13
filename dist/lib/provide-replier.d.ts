import { EnvironmentProviders } from '@angular/core';
import { ReplierConfig } from './replier.config';
/**
 * Standalone setup:
 *   bootstrapApplication(AppComponent, {
 *     providers: [provideHttpClient(), provideReplier({ baseUrl: '/api/replier' })],
 *   });
 */
export declare function provideReplier(config: ReplierConfig): EnvironmentProviders;
//# sourceMappingURL=provide-replier.d.ts.map