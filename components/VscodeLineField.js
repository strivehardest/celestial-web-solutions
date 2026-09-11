/**
 * VS Code–style underline field: bottom rule + animated focus line.
 */
export default function VscodeLineField({
  as = 'input',
  id,
  name,
  label,
  required = false,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  rows = 4,
  children,
  hint,
  className = '',
}) {
  const Tag = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';
  const sharedProps = {
    id,
    name,
    required,
    value,
    onChange,
    placeholder: as === 'select' ? undefined : placeholder,
    rows: as === 'textarea' ? rows : undefined,
    type: as === 'input' ? type : undefined,
    className:
      'vscode-line-control peer w-full bg-transparent px-0.5 py-3 text-[15px] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none',
    style: { fontFamily: 'Albert Sans, sans-serif' },
  };

  return (
    <div className={`vscode-line-field ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          {label}
          {required ? <span className="ml-0.5 text-orange-500">*</span> : null}
        </label>
      ) : null}

      <div className="vscode-line-shell relative">
        <Tag {...sharedProps}>{as === 'select' ? children : null}</Tag>
        <span className="vscode-line-base" aria-hidden="true" />
        <span className="vscode-line-active" aria-hidden="true" />
        <span className="vscode-line-caret" aria-hidden="true" />
      </div>

      {hint ? (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
