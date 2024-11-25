import { autocompletion } from "@codemirror/autocomplete";

const ezKeywords = [
    "manlo",
    "agar",
    "likho",
    "nahi_to_agar",
    "nahi_to",
    "rukjao",
    "chhod_do",
    "jabtak",
    "me",
    "ho_tab",
    "ho_tabtak",
];

function ezCompletion(code) {
    // Extract used variables and functions from code
    const usedWords = new Set();
    const lines = code.split("\n");
    lines.forEach((line) => {
        const words = line.match(/\b\w+\b/g) || [];
        words.forEach((word) => usedWords.add(word));
    });

    const keywordCompletions = ezKeywords.map((word) => ({
        label: word,
        type: "keyword",
        boost: 99,
    }));

    const variableCompletions = [...usedWords].map((word) => ({
        label: word,
        type: "variable",
        boost: 50,
    }));

    const completions = [...keywordCompletions, ...variableCompletions];

    return autocompletion({
        override: [
            (context) => {
                let word = context.matchBefore(/\w*/);
                if (!word) return null;
                if (word.from === word.to && !context.explicit) return null;

                const currentWord = word.text;

                // Filter out the currently typed word
                const filteredCompletions = completions.filter(
                    (completion) => completion.label !== currentWord
                );

                // Sort to prioritize ezKeywords
                const sortedCompletions = filteredCompletions.sort(
                    (a, b) => b.boost - a.boost
                );

                return {
                    from: word.from,
                    options: sortedCompletions,
                };
            },
        ],
    });
}

export { ezCompletion, ezKeywords };
