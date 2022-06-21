import * as vsc from 'vscode';
import { getPrevCharacter, getWord } from '../util';
import { helpers } from './helpers';

const allHelpers = Object.values(helpers);
const blockHelpers = allHelpers.filter(h => h.isBlock);
const lineHelpers = allHelpers.filter(h => !h.isBlockOnly);

export class BChelpersCompletionProvider implements vsc.CompletionItemProvider<vsc.CompletionItem> {
	private secondBrace: boolean = false;
	private lineContext: string = '';

	provideCompletionItems(
		document: vsc.TextDocument,
		position: vsc.Position,
		token: vsc.CancellationToken,
		context: vsc.CompletionContext): vsc.ProviderResult<vsc.CompletionItem[] | vsc.CompletionList<vsc.CompletionItem>> {

		this.secondBrace = this.isSecondBrace(document, position);
		const trigger = context.triggerCharacter;

		if (trigger === '{' && this.secondBrace) {
			return allHelpers.map(helper => new vsc.CompletionItem({
				label: helper.isBlockOnly ? '#' + helper.name : helper.name,
				description: helper.synopsis || helper.brief,
			}));
		} else if (trigger === '(') {
			return lineHelpers.map(helper => new vsc.CompletionItem({
				label: helper.name,
				description: helper.synopsis || helper.brief,
			}));
		}
	}

	resolveCompletionItem(item: vsc.CompletionItem): vsc.ProviderResult<vsc.CompletionItem> {
		let key = (item.label as vsc.CompletionItemLabel).label;

		if (key.startsWith('#')) {
			key = key.substring(1);
		}

		const helper = helpers[key];

		item.documentation = new vsc.MarkdownString(helper.docs);

		return item;
	}

	private isSecondBrace(document: vsc.TextDocument, position: vsc.Position): boolean {
		const char = getPrevCharacter(document, position);
		return char === '{';
	}
}
