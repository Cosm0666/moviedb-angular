
declare module 'xhr2' {
  class XMLHttpRequest {
    constructor();
    open(method: string, url: string, async?: boolean): void;
    send(data?: any): void;
    setRequestHeader(header: string, value: string): void;
    abort(): void;
    readyState: number;
    status: number;
    statusText: string;
    response: any;
    responseText: string;
    responseType: string;
    onreadystatechange: (() => void) | null;
    onload: (() => void) | null;
    onerror: (() => void) | null;
    ontimeout: (() => void) | null;
  }
  
  export { XMLHttpRequest };
}