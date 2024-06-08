declare module 'simple-xmpp' {
    interface XmppConfig {
      jid: string;
      password: string;
      host: string;
      port: number;
    }
  
    interface XmppData {
      jid: { user: string };
    }
  
    interface XmppMessage {
      from: string;
      message: string;
    }
  
    interface XmppClient {
      on(event: 'online', callback: (data: XmppData) => void): void;
      on(event: 'chat', callback: (from: string, message: string) => void): void;
      on(event: 'error', callback: (error: Error) => void): void;
      connect(config: XmppConfig): void;
    }
  
    const xmpp: XmppClient;
    export = xmpp;
  }