import * as vsc from 'vscode';
import { registerProviders } from './completion';

export function activate(context: vsc.ExtensionContext) {

	console.log('BigCommerce theme detected');

	registerProviders(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }
