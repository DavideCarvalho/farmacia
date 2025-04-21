interface HighlightProps {
    text: string;
    search: string;
}

export function Highlight({ text, search }: HighlightProps) {
    if (!search) return <>{text}</>;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === search.toLowerCase() ? (
                    <span key={i} className="bg-yellow-200">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
} 