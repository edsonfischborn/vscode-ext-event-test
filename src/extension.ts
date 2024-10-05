import * as vscode from "vscode";
import { EventTestProvider } from "./EventTestProvider";

export function activate(context: vscode.ExtensionContext) {
  const provider = new EventTestProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      EventTestProvider.viewType,
      provider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("postMessage.count", () => {
      console.log("Count requested by postMessage.count command");

      provider.postMessageToWebview({
        type: "count",
      });
    })
  );
}

export function deactivate() {}
