import * as vsc from 'vscode';
import { BChelpersCompletionProvider } from './BChelpersCompletionProvider';
import { BChelpersHoverProvider } from './BCHelpersHoverProvider';
import BCHelpersLinkedEditingRangeProvider from './BCHelpersLinkedEditingRangeProvider';

export function registerProviders(context: vsc.ExtensionContext) {
    const handlebarsSelector: vsc.DocumentSelector = { 'language': 'handlebars', 'scheme': 'file' };

    context.subscriptions.push(
        vsc.languages.registerCompletionItemProvider(
            handlebarsSelector,
            new BChelpersCompletionProvider(),
            '{', '('
        ),
        vsc.languages.registerHoverProvider(
            handlebarsSelector,
            new BChelpersHoverProvider()
        ),
        vsc.languages.registerLinkedEditingRangeProvider(
            handlebarsSelector,
            new BCHelpersLinkedEditingRangeProvider()
        )
    );
}