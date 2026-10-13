import * as i0 from '@angular/core';
import { InjectionToken, Optional, Inject, Injectable, NgModule, makeEnvironmentProviders } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i1 from '@angular/common/http';

const REPLIER_CONFIG = new InjectionToken('REPLIER_CONFIG');
const DEFAULT_BASE_URL = 'https://api.replier.net';

class ReplierError extends Error {
    constructor(message, errorCode, response, httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.response = response;
        this.httpStatus = httpStatus;
        this.name = 'ReplierError';
    }
}
const joinPhones = (phones) => (Array.isArray(phones) ? phones.join(',') : phones);
class ReplierService {
    constructor(http, config) {
        this.http = http;
        this.config = { ...(config ?? {}) };
    }
    /** Change credentials at runtime, e.g. after the user picks an instance. */
    configure(config) {
        this.config = { ...this.config, ...config };
    }
    // ------------------------------------------------------------------ core
    /** Call any instance endpoint; instanceid and token are added when configured. */
    call(method, params = {}) {
        const auth = {};
        if (this.config.instanceId != null)
            auth['instanceid'] = String(this.config.instanceId);
        if (this.config.token != null)
            auth['token'] = this.config.token;
        return this.request(method, { ...auth, ...params });
    }
    /** Call an account endpoint; email and apikey are added when configured. */
    callAccount(method, params = {}) {
        const auth = {};
        if (this.config.email != null)
            auth['email'] = this.config.email;
        if (this.config.apiKey != null)
            auth['apikey'] = this.config.apiKey;
        return this.request(method, { ...auth, ...params });
    }
    request(method, params) {
        const body = {};
        for (const [k, v] of Object.entries(params))
            if (v !== undefined && v !== null)
                body[k] = v;
        const baseUrl = (this.config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
        return this.http.post(`${baseUrl}/${method}`, body).pipe(catchError((err) => {
            const data = err.error && typeof err.error === 'object' ? err.error : undefined;
            return throwError(() => new ReplierError(data ? reasonOf(data, err.message) : err.message, data?.errorCode != null ? String(data.errorCode) : undefined, data, err.status));
        }), map((data) => {
            if (data === null || typeof data !== 'object')
                throw new ReplierError('Invalid JSON response');
            if (data.success === false || data.success === 'false') {
                throw new ReplierError(reasonOf(data, 'Request failed'), data.errorCode != null ? String(data.errorCode) : undefined, data, 200);
            }
            return data;
        }));
    }
    // ------------------------------------------------------------------ instance
    status() { return this.call('status'); }
    qrCode() { return this.call('qr_code'); }
    pairCode(phone) { return this.call('pair_code', { phone }); }
    logout() { return this.call('logout'); }
    takeover() { return this.call('takeover'); }
    expiry() { return this.call('expiry'); }
    retry() { return this.call('retry'); }
    reboot() { return this.call('reboot'); }
    getSettings() { return this.call('getSettings'); }
    setSettings(settings) { return this.call('settings', settings); }
    me() { return this.call('me'); }
    version() { return this.call('version'); }
    screenshot() { return this.call('screenshot'); }
    // ------------------------------------------------------------------ messages
    sendMessage(phone, body, options) {
        return this.call('sendMessage', { phone, body, options });
    }
    /** @param body file URL or base64 data URI */
    sendFile(phone, body, filename, caption) {
        return this.call('sendFile', { phone, body, filename, caption });
    }
    sendPTT(phone, audio) { return this.call('sendPTT', { phone, audio }); }
    sendLink(phone, body) { return this.call('sendLink', { phone, body }); }
    sendContact(phone, contactId) { return this.call('sendContact', { phone, contactId }); }
    sendLocation(phone, lat, lng, address) {
        return this.call('sendLocation', { phone, lat, lng, address });
    }
    sendVCard(phone, vcard) { return this.call('sendVCard', { phone, vcard }); }
    sendButton(phone, body, buttons, header, footer) {
        return this.call('sendButton', { phone, body, buttons, header, footer });
    }
    sendList(phone, body, title, list, header, footer) {
        return this.call('sendList', { phone, body, title, list, header, footer });
    }
    forwardMessage(phone, messageId) { return this.call('forwardMessage', { phone, messageId }); }
    deleteMessage(phone, messageId) { return this.call('deleteMessage', { phone, messageId }); }
    sendSeen(phone) { return this.call('sendSeen', { phone }); }
    messages(phone, limit, lastMessageNumber) {
        return this.call('messages', { phone, limit, lastMessageNumber });
    }
    showMessagesQueue() { return this.call('showMessagesQueue'); }
    clearMessagesQueue() { return this.call('clearMessagesQueue'); }
    showActionsQueue() { return this.call('showActionsQueue'); }
    clearActionsQueue() { return this.call('clearActionsQueue'); }
    // ------------------------------------------------------------------ chats
    dialogs() { return this.call('dialogs'); }
    chats() { return this.call('chats'); }
    contacts() { return this.call('contacts'); }
    // ------------------------------------------------------------------ groups
    createGroup(groupName, phones) {
        return this.call('group', { groupName, phones: joinPhones(phones) });
    }
    leaveGroup(groupId) { return this.call('leaveGroup', { groupId }); }
    addGroupParticipant(groupId, phones) {
        return this.call('addGroupParticipant', { groupId, phones: joinPhones(phones) });
    }
    removeGroupParticipant(groupId, phones) {
        return this.call('removeGroupParticipant', { groupId, phones: joinPhones(phones) });
    }
    promoteGroupParticipant(groupId, phones) {
        return this.call('promoteGroupParticipant', { groupId, phones: joinPhones(phones) });
    }
    demoteGroupParticipant(groupId, phones) {
        return this.call('demoteGroupParticipant', { groupId, phones: joinPhones(phones) });
    }
    // ------------------------------------------------------------------ channels
    createChannel(name, description, picture) {
        return this.call('channel', { name, description, picture });
    }
    followChannel(channelId) { return this.call('channelFollow', { channelId }); }
    unfollowChannel(channelId) { return this.call('channelUnfollow', { channelId }); }
    channelInfo(channelId) { return this.call('channelInfo', { channelId }); }
    // ------------------------------------------------------------------ webhook / bot / ban
    setWebhook(webhookUrl) { return this.call('webhook', { webhookUrl }); }
    getWebhookStatus() { return this.call('getWebhookStatus'); }
    getBanSettings() { return this.call('getBanSettings'); }
    botSettings() { return this.call('botSettings'); }
    getBotSettings() { return this.call('getbotSettings'); }
    // ------------------------------------------------------------------ account
    listInstances() { return this.callAccount('listInstances'); }
    newInstance(packageId, voucher) {
        return this.callAccount('newInstance', { packageid: packageId, voucher });
    }
    renewInstance(instanceId, packageId, voucher) {
        return this.callAccount('renewInstance', { instanceid: String(instanceId), packageid: packageId, voucher });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ReplierService, deps: [{ token: i1.HttpClient }, { token: REPLIER_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ReplierService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ReplierService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [REPLIER_CONFIG]
                }] }] });
function reasonOf(data, fallback) {
    if (data.reason)
        return String(data.reason);
    if (data.msg)
        return Array.isArray(data.msg) ? data.msg.join(', ') : String(data.msg);
    return fallback;
}

/**
 * NgModule setup (for apps not using standalone bootstrap):
 *   imports: [HttpClientModule, ReplierModule.forRoot({ baseUrl: '/api/replier' })]
 */
class ReplierModule {
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

/**
 * Standalone setup:
 *   bootstrapApplication(AppComponent, {
 *     providers: [provideHttpClient(), provideReplier({ baseUrl: '/api/replier' })],
 *   });
 */
function provideReplier(config) {
    return makeEnvironmentProviders([{ provide: REPLIER_CONFIG, useValue: config }]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_BASE_URL, REPLIER_CONFIG, ReplierError, ReplierModule, ReplierService, provideReplier };
//# sourceMappingURL=ngx-replier.mjs.map
