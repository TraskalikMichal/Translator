export class Translation {
    translationText: string;
    translationResult: string;
    from: string;
    to: string;

    constructor(text: string, result: string, from: string, to: string) {
        this.translationText = text;
        this.translationResult = result;
        this.from = from;
        this.to = to;
    }
}