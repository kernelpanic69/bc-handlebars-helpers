import * as vsc from "vscode";
import { helpers } from "./helpers";

export class BChelpersHoverProvider implements vsc.HoverProvider {
    provideHover(document: vsc.TextDocument, position: vsc.Position, token: vsc.CancellationToken): vsc.ProviderResult<vsc.Hover> {
        const range = document.getWordRangeAtPosition(position);
        let word = document.getText(range);

        if (word.startsWith('#') || word.startsWith('/')) {
            word = word.substring(1);
        }

        const helper = helpers[word];

        if (helper) {
            const hover = new vsc.MarkdownString();
            hover.appendMarkdown(helper.docs || helper.synopsis || '' + '\n' + helper.brief);
            return new vsc.Hover(hover, range);
        }
    }
}