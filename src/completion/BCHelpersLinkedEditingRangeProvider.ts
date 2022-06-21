import * as vsc from 'vscode';
import { getWord, rangeFromStart, rangeToEnd } from '../util';

const blockRegex = /\{\{[\#|\/]\w+\b/g;

export default class BCHelpersLinkedEditingRangeProvider implements vsc.LinkedEditingRangeProvider {
    provideLinkedEditingRanges(document: vsc.TextDocument, position: vsc.Position, token: vsc.CancellationToken): vsc.ProviderResult<vsc.LinkedEditingRanges> {
        const ranges = this.findMatches(document, position);
        return new vsc.LinkedEditingRanges(ranges);
    }

    private findMatches(document: vsc.TextDocument, position: vsc.Position): vsc.Range[] {
        const range = document.getWordRangeAtPosition(position, blockRegex);
        const word = document.getText(range);

        if (word.startsWith('{{#')) {
            return this.lookForward(word, document, position);
        } else if (word.startsWith('{{/')) {
            return this.lookBackward(word, document, position);
        }

        return [];
    }

    private lookForward(word: string, document: vsc.TextDocument, position: vsc.Position): vsc.Range[] {
        const endRange = rangeToEnd(document, position);
        const text = document.getText(endRange);
        const blocks = Array.from(text.matchAll(blockRegex));
        const thisBlock = blocks[0];
        let blocksOpen = 0;

        for (let i = 1; i < blocks.length; i++) {
            const match = blocks[i];

            if (match[0] === word) {
                blocksOpen++;
            } else if (match[0] === word.replace('#', '/')) {
                blocksOpen--;

                if (blocksOpen < 0) {
                    const matchOffset = document.offsetAt(endRange.start) + (match.index || 0) + 3;
                    const blockPos = document.positionAt(matchOffset);
                    const thisOffset = document.offsetAt(endRange.start) + (thisBlock.index || 0) + 3;
                    const thisPos = document.positionAt(thisOffset);

                    return [
                        new vsc.Range(thisPos, thisPos.translate(0, word.length - 3)),
                        new vsc.Range(blockPos, blockPos.translate(0, word.length - 3))
                    ];
                }
            }
        }

        return [];
    }

    private lookBackward(word: string, document: vsc.TextDocument, position: vsc.Position): vsc.Range[] {
        const startRange = rangeFromStart(document, position);
        const text = document.getText(startRange);
        const blocks = Array.from(text.matchAll(blockRegex));
        const thisBlock = blocks[blocks.length - 1];
        let blocksOpen = 0;

        for (let i = blocks.length - 2; i >= 0; i--) {
            const match = blocks[i];

            if (match[0] === word) {
                blocksOpen++;
            } else if (match[0] === word.replace('/', '#')) {
                blocksOpen--;

                if (blocksOpen < 0) {
                    const blockPos = document.positionAt((match.index || 0) + 3);
                    const thisPos = document.positionAt((thisBlock.index || 0) + 3);

                    console.log(blockPos);
                    console.log(thisPos);

                    return [
                        new vsc.Range(thisPos, thisPos.translate(0, word.length - 3)),
                        new vsc.Range(blockPos, blockPos.translate(0, word.length - 3)),
                    ];
                }
            }
        }

        return [];
    }
}