import { InjectionToken } from '@angular/core';

export interface ReplierConfig {
  /**
   * Defaults to https://api.replier.net.
   * For public apps, point this at your own backend proxy that injects the
   * credentials, and leave instanceId/token/email/apiKey unset here.
   */
  baseUrl?: string;
  instanceId?: string | number;
  token?: string;
  /** Needed only for listInstances / newInstance / renewInstance. */
  email?: string;
  apiKey?: string;
}

export const REPLIER_CONFIG = new InjectionToken<ReplierConfig>('REPLIER_CONFIG');

export const DEFAULT_BASE_URL = 'https://api.replier.net';
