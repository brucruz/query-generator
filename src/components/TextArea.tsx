interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  value: string;
  placeholder?: string;
  label?: string;
  rows?: number;
  resizable?: boolean;
}

export function TextArea({
  id,
  value,
  placeholder,
  label,
  rows = 2,
  resizable = false,
  ...rest
}: TextAreaProps): JSX.Element {
  return (
    <div className="pt-6 pb-8">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}

      <div className="overflow-hidden">
        <textarea
          id={id}
          className={`p-2 text-slate-900 w-full resize-none border-x-0 border-t-0 border-gray-200 align-top sm:text-sm ${
            resizable ? "resize-y" : "resize-none"
          }`}
          rows={rows}
          placeholder={placeholder}
          value={value}
          {...rest}
        ></textarea>
      </div>
    </div>
  );
}

export default TextArea;
