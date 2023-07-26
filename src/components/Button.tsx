interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary";
}

export function Button({
  text,
  variant = "primary",
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <>
      {variant === "primary" ? (
        <button
          className="w-full text-center cursor-pointer inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring active:text-indigo-500"
          {...rest}
        >
          {text}
        </button>
      ) : (
        <button
          className="w-full text-center cursor-pointer inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          {...rest}
        >
          {text}
        </button>
      )}
    </>
  );
}

export default Button;
