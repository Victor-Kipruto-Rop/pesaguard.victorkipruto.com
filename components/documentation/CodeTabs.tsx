import { CodeBlock } from "@/components/ui/CodeBlock";

export type CodeTab = { id: string; title: string; language: string; code: string };

/**
 * Language switcher built from radio inputs and sibling selectors, so it
 * works without client JavaScript. Supports up to four tabs.
 */
export function CodeTabs({ id, label, tabs }: { id: string; label: string; tabs: CodeTab[] }) {
  return (
    <fieldset className="code-tabs">
      <legend className="visually-hidden">{label}</legend>
      {tabs.map((tab, index) => (
        <input
          key={tab.id}
          type="radio"
          name={`tabs-${id}`}
          id={`tabs-${id}-${tab.id}`}
          className={`code-tab-input code-tab-input-${index}`}
          defaultChecked={index === 0}
        />
      ))}
      <div className="code-tab-bar">
        {tabs.map((tab, index) => (
          <label key={tab.id} htmlFor={`tabs-${id}-${tab.id}`} className={`code-tab-label code-tab-label-${index}`}>
            {tab.title}
          </label>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div key={tab.id} className={`code-tab-panel code-tab-panel-${index}`}>
          <CodeBlock code={tab.code} language={tab.language} label={label} />
        </div>
      ))}
    </fieldset>
  );
}
