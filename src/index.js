// Create a tagged template lf`...` that formats text using LF line endings.
const lf = (strings, ...values) => {
    //implement a template tag
    return strings.reduce((result, literal, index) => {
        const transformedString = transformLineEnding(literal, LineEndings.LF);

        let transformedValue = (
            values[index] != null
                ? transformLineEnding(values[index], LineEndings.LF)
                : ""
        );
        return `${result}${transformedString}${transformedValue}`;
    }, "");

};

// Create a tagged template cr`...` that formats text using CR line endings.
const cr = () => { };

// Create a tagged template crlf`...` that formats text using CRLF line endings.
const crlf = () => { };

const transformLineEnding = (string, lineEnding) => {
    const { replaceCR, replaceLF, replaceCRLF } = LineEndingReplacements;
    //bc lineEndingReplacements.replaceCR  are their methods
    string = (string != null ? string.toString() : "");


    if (lineEnding === LineEndings.CR) {
        string = replaceCRLF(string, "\r");
        string = replaceLF(string, "\r");
    } else if (lineEnding === LineEndings.LF) {
        string = replaceCRLF(string, "\n");
        string = replaceCR(string, "\n");
    } else if (lineEnding === LineEndings.CRLF) {
        string = replaceCR(string, "\r\n");
        string = replaceLF(string, "\r\n");
    }
    return string;
};

const disableConverter = Symbol.for("crlf-converter-disable")

const LineEndings = {
    CR: Symbol("CR"),
    LF: Symbol("LF"),
    CRLF: Symbol("CRLF")
};

const LineEndingReplacements = {
    replaceCR: (string, newEnding) =>
        string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
            return `${newEnding.repeat(p1.length)}${p2}`;
        }),

    replaceLF: (string, newEnding) =>
        string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
            return `${p1}${newEnding.repeat(p2.length)}`;
        }),

    replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
    lf,
    cr,
    crlf,
    disableConverter,
    LineEndings,
    transformLineEnding
};
