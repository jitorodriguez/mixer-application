import * as ko from "knockout";

class HelloViewModel {
    public language: KnockoutObservable<string>;
    public framework: KnockoutObservable<string>;

    constructor(language: string, framework: string) {
        this.language = ko.observable(language);
        this.framework = ko.observable(framework);
    }
}

ko.applyBindings(new HelloViewModel("TypeScript", "Knockout"));
