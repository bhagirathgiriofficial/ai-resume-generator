/**
 * Custom Markdown Parser for Resume Content
 * Handles basic markdown syntax used in our resume generation
 */

export const parseMarkdown = (text) => {
  if (!text) return [];

  // Split the text into lines
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    // Remove any trailing whitespace
    line = line.trim();

    // Skip empty lines
    if (!line) return { type: 'empty', content: '', key: index };

    // Parse headers (text wrapped in **)
    if (line.startsWith('**') && line.endsWith('**')) {
      return {
        type: 'header',
        content: line.replace(/\*\*/g, ''),
        key: index
      };
    }

    // Parse bullet points (lines starting with * **)
    if (line.startsWith('* **')) {
      return {
        type: 'bullet',
        content: line.replace(/\* \*\*/g, '').replace(/\*\*/g, ''),
        key: index
      };
    }

    // Parse bold text (text wrapped in **)
    if (line.includes('**')) {
      const parts = line.split('**');
      return {
        type: 'mixed',
        content: parts.map((part, i) => ({
          text: part,
          bold: i % 2 === 1
        })),
        key: index
      };
    }

    // Regular text
    return {
      type: 'text',
      content: line,
      key: index
    };
  });
};

export const MarkdownRenderer = ({ content }) => {
  const parsedContent = parseMarkdown(content);

  return (
    <div className="markdown-content">
      {parsedContent.map((item) => {
        switch (item.type) {
          case 'header':
            return (
              <h2 key={item.key} className="text-xl font-bold mt-4 mb-2 text-gray-800">
                {item.content}
              </h2>
            );
          case 'bullet':
            return (
              <div key={item.key} className="ml-4 flex items-start">
                <span className="mr-2">•</span>
                <span className="text-gray-700">{item.content}</span>
              </div>
            );
          case 'mixed':
            return (
              <p key={item.key} className="text-gray-700">
                {item.content.map((part, i) => (
                  <span key={i} className={part.bold ? 'font-bold' : ''}>
                    {part.text}
                  </span>
                ))}
              </p>
            );
          case 'text':
            return (
              <p key={item.key} className="text-gray-700">
                {item.content}
              </p>
            );
          case 'empty':
            return <div key={item.key} className="h-2" />;
          default:
            return null;
        }
      })}
    </div>
  );
}; 