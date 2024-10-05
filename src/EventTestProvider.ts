import * as vscode from "vscode";

export class EventTestProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "helloWorld.view";

  public _view: vscode.WebviewView | undefined;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, "media")],
    };

    webviewView.webview.html = this.getHtmlContent(webviewView.webview);
  }

  public postMessageToWebview(message: any) {
    this._view?.webview.postMessage(message);
  }

  private readonly getNonce = () => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  private joinPath = (...segments: string[]) => {
    return vscode.Uri.joinPath(this._extensionUri, ...segments);
  };

  private getAsWebViewUri = (
    webView: vscode.Webview,
    ...segments: string[]
  ) => {
    return webView.asWebviewUri(this.joinPath(...segments));
  };

  private getHtmlContent = (webview: vscode.Webview) => {
    const nonce = this.getNonce();

    const rootScriptUri = this.getAsWebViewUri(
      webview,
      ...["media", "main.js"]
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <title>Hello World</title>
      </head>
      <body>
        <h1>Counter: </h1>
        <h2>no event received</h2>
        <script nonce="${nonce}" src="${rootScriptUri}"></script>
      </body>
      </html>`;
  };
}
