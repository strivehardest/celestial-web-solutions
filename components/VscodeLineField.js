import { Children, cloneElement, isValidElement } from 'react';

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
  const controlClass =
    as === 'select'
      ? 'vscode-line-control vscode-line-select peer w-full bg-transparent px-0.5 py-3 text-[15px] text-gray-900 dark:text-gray-100 focus:outline-none'
      : 'vscode-line-control peer w-full bg-transparent px-0.5 py-3 text-[15px] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none';
  const sharedProps = {
    id,
    name,
    required,
    value,
    onChange,
    placeholder: as === 'select' ? undefined : placeholder,
    rows: as === 'textarea' ? rows : undefined,
    type: as === 'input' ? type : undefined,
    className: controlClass,
    style: {
      fontFamily: 'Albert Sans, sans-serif',
      ...(as === 'select' ? { colorScheme: 'light' } : null),
    },
  };

  const selectChildren =
    as === 'select'
      ? Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          if (child.type === 'option') {
            return cloneElement(child, {
              className: `text-stone-900 bg-white ${child.props.className || ''}`.trim(),
              style: {
                color: '#1c1917',
                backgroundColor: '#ffffff',
                ...(child.props.style || {}),
              },
            });
          }
          if (child.type === 'optgroup') {
            return cloneElement(child, {
              style: {
                color: '#1c1917',
                backgroundColor: '#ffffff',
                ...(child.props.style || {}),
              },
              children: Children.map(child.props.children, (opt) => {
                if (!isValidElement(opt) || opt.type !== 'option') return opt;
                return cloneElement(opt, {
                  style: {
                    color: '#1c1917',
                    backgroundColor: '#ffffff',
                    ...(opt.props.style || {}),
                  },
                });
              }),
            });
          }
          return child;
        })
      : null;

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
        <Tag {...sharedProps}>{as === 'select' ? selectChildren : null}</Tag>
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
