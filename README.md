# ngx-replier (Angular)

Angular SDK for the [Replier.net](https://www.replier.net) WhatsApp API, built on `HttpClient` and RxJS.
Supports Angular 15+ with standalone or NgModule setup.

## Install

```bash
npm install ngx-replier
```

## ⚠️ Keep credentials out of the browser

Everything in an Angular bundle is readable by users. **Do not ship your
instance `token` or account `apiKey` in a public app.** Instead, run a small
backend proxy that forwards `POST /api/replier/{method}` to
`https://api.replier.net/{method}` and adds `instanceid` + `token` to the
JSON body server-side. Then configure only `baseUrl`:

```ts
provideReplier({ baseUrl: '/api/replier' })
```

Pass `instanceId` / `token` directly only in internal or admin tools.

## Setup

Standalone:

```ts
import { provideHttpClient } from '@angular/common/http';
import { provideReplier } from 'ngx-replier';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideReplier({ baseUrl: '/api/replier' })],
});
```

NgModule:

```ts
@NgModule({
  imports: [HttpClientModule, ReplierModule.forRoot({ baseUrl: '/api/replier' })],
})
export class AppModule {}
```

## Usage

```ts
import { ReplierService, ReplierError } from 'ngx-replier';

@Component({ /* ... */ })
export class ChatComponent {
  private replier = inject(ReplierService);

  send() {
    this.replier.sendMessage('15551234567', 'Hello!').subscribe({
      next: (res) => console.log('sent', res.id),
      error: (err: ReplierError) => console.error(err.errorCode, err.message),
    });
  }
}
```

Credentials can be switched at runtime with `replier.configure({ instanceId, token })`.
Every method returns an `Observable`; see the [method reference](../README.md#method-reference).

## Build & publish

```bash
npm install
npm run build
cd dist && npm publish
```

## License

MIT
