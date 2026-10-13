import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplierConfig } from './replier.config';
import * as i0 from "@angular/core";
export type ReplierResponse = Record<string, any>;
export interface SendResult extends ReplierResponse {
    sent?: boolean;
    id?: string;
    from?: string;
    to?: string;
    timestamp?: number;
    type?: string;
}
export declare class ReplierError extends Error {
    readonly errorCode?: string | undefined;
    readonly response?: ReplierResponse | undefined;
    readonly httpStatus?: number | undefined;
    constructor(message: string, errorCode?: string | undefined, response?: ReplierResponse | undefined, httpStatus?: number | undefined);
}
type Params = Record<string, unknown>;
export declare class ReplierService {
    private http;
    private config;
    constructor(http: HttpClient, config: ReplierConfig | null);
    /** Change credentials at runtime, e.g. after the user picks an instance. */
    configure(config: Partial<ReplierConfig>): void;
    /** Call any instance endpoint; instanceid and token are added when configured. */
    call<T = ReplierResponse>(method: string, params?: Params): Observable<T>;
    /** Call an account endpoint; email and apikey are added when configured. */
    callAccount<T = ReplierResponse>(method: string, params?: Params): Observable<T>;
    private request;
    status(): Observable<ReplierResponse>;
    qrCode(): Observable<ReplierResponse>;
    pairCode(phone: string): Observable<ReplierResponse>;
    logout(): Observable<ReplierResponse>;
    takeover(): Observable<ReplierResponse>;
    expiry(): Observable<ReplierResponse>;
    retry(): Observable<ReplierResponse>;
    reboot(): Observable<ReplierResponse>;
    getSettings(): Observable<ReplierResponse>;
    setSettings(settings: Params): Observable<ReplierResponse>;
    me(): Observable<ReplierResponse>;
    version(): Observable<ReplierResponse>;
    screenshot(): Observable<ReplierResponse>;
    sendMessage(phone: string, body: string, options?: Params): Observable<SendResult>;
    /** @param body file URL or base64 data URI */
    sendFile(phone: string, body: string, filename: string, caption?: string): Observable<SendResult>;
    sendPTT(phone: string, audio: string): Observable<SendResult>;
    sendLink(phone: string, body: string): Observable<SendResult>;
    sendContact(phone: string, contactId: string): Observable<SendResult>;
    sendLocation(phone: string, lat: number, lng: number, address?: string): Observable<SendResult>;
    sendVCard(phone: string, vcard: string): Observable<SendResult>;
    sendButton(phone: string, body: string, buttons: unknown, header?: string, footer?: string): Observable<SendResult>;
    sendList(phone: string, body: string, title: string, list: unknown, header?: string, footer?: string): Observable<SendResult>;
    forwardMessage(phone: string, messageId: string): Observable<SendResult>;
    deleteMessage(phone: string, messageId: string): Observable<ReplierResponse>;
    sendSeen(phone: string): Observable<ReplierResponse>;
    messages(phone: string, limit?: number, lastMessageNumber?: number): Observable<ReplierResponse>;
    showMessagesQueue(): Observable<ReplierResponse>;
    clearMessagesQueue(): Observable<ReplierResponse>;
    showActionsQueue(): Observable<ReplierResponse>;
    clearActionsQueue(): Observable<ReplierResponse>;
    dialogs(): Observable<ReplierResponse>;
    chats(): Observable<ReplierResponse>;
    contacts(): Observable<ReplierResponse>;
    createGroup(groupName: string, phones: string | string[]): Observable<ReplierResponse>;
    leaveGroup(groupId: string): Observable<ReplierResponse>;
    addGroupParticipant(groupId: string, phones: string | string[]): Observable<ReplierResponse>;
    removeGroupParticipant(groupId: string, phones: string | string[]): Observable<ReplierResponse>;
    promoteGroupParticipant(groupId: string, phones: string | string[]): Observable<ReplierResponse>;
    demoteGroupParticipant(groupId: string, phones: string | string[]): Observable<ReplierResponse>;
    createChannel(name: string, description?: string, picture?: string): Observable<ReplierResponse>;
    followChannel(channelId: string): Observable<ReplierResponse>;
    unfollowChannel(channelId: string): Observable<ReplierResponse>;
    channelInfo(channelId: string): Observable<ReplierResponse>;
    setWebhook(webhookUrl: string): Observable<ReplierResponse>;
    getWebhookStatus(): Observable<ReplierResponse>;
    getBanSettings(): Observable<ReplierResponse>;
    botSettings(): Observable<ReplierResponse>;
    getBotSettings(): Observable<ReplierResponse>;
    listInstances(): Observable<ReplierResponse>;
    newInstance(packageId: number, voucher?: string): Observable<ReplierResponse>;
    renewInstance(instanceId: string | number, packageId: number, voucher?: string): Observable<ReplierResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplierService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReplierService>;
}
export {};
//# sourceMappingURL=replier.service.d.ts.map