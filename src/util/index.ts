import { Position, Range, TextDocument } from 'vscode';

export function getPrevCharacter(doc: TextDocument, pos: Position): string {
    return doc.getText(
        new Range(
            new Position(pos.line, pos.character - 2),
            new Position(pos.line, pos.character - 1)
        )
    );
}

export function getWord(doc: TextDocument, pos: Position): string {
    return doc.getText(doc.getWordRangeAtPosition(pos));
}

export function rangeFromStart(doc: TextDocument, position: Position) {
    const offset = doc.lineAt(position.line).range.end.character;
    return new Range(new Position(0, 0), position.translate(0, offset));
}

export function rangeToEnd(doc: TextDocument, pos: Position): Range {
    const end = doc.lineAt(doc.lineCount - 1).range.end;
    return new Range(pos.translate(0, -pos.character), end);
}

export function documentEndOffset(doc: TextDocument): Position {
    return doc.lineAt(doc.lineCount - 1).range.end;
}