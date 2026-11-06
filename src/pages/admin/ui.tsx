// Form primitives for the Obra admin. Sentro hub look in the Obra palette.
import { ReactNode, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const INK = "#383838";

export const card =
  "rounded-2xl border border-slate-200/70 bg-white shadow-sm shadow-slate-200/40";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-[11px] text-gray-400">{hint}</span>
      )}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#383838] focus:ring-2 focus:ring-slate-100";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputBase} resize-y leading-relaxed ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2.5 text-[13px] font-medium text-gray-700"
    >
      <span
        className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${
          checked ? "bg-[#383838]" : "bg-gray-200"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

export function Btn({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger";
}) {
  const styles = {
    primary: "bg-[#383838] text-white hover:opacity-90",
    outline: "border border-gray-200 text-gray-700 hover:border-gray-300 bg-white",
    ghost: "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
    danger: "border border-red-200 text-red-600 hover:bg-red-50",
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors disabled:opacity-50 ${styles} ${className}`}
    />
  );
}

/** A titled block inside a form Drawer. */
export function FormSection({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </p>
      {hint && <p className="mt-0.5 text-[12px] text-gray-400">{hint}</p>}
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

/** Chip / tag editor for a string[] — type + Enter (or comma) to add. */
export function TagInput({
  value,
  onChange,
  placeholder,
  suggestions,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useRef(
    `tags-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  const add = (raw: string) => {
    const v = raw.trim();
    if (!v || value.includes(v)) {
      setText("");
      return;
    }
    onChange([...value, v]);
    setText("");
  };

  const remove = (i: number) => onChange(value.filter((_, x) => x !== i));

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-wrap items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-2 focus-within:border-[#383838] focus-within:ring-2 focus-within:ring-slate-100"
    >
      {value.map((tag, i) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 py-1 pl-2.5 pr-1 text-[12px] text-slate-700"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              remove(i);
            }}
            className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <X className="h-3 w-3" strokeWidth={2} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={text}
        list={suggestions?.length ? listId : undefined}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(text);
          } else if (e.key === "Backspace" && !text && value.length) {
            remove(value.length - 1);
          }
        }}
        onBlur={() => add(text)}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[120px] flex-1 bg-transparent px-1 py-0.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />
      {suggestions?.length ? (
        <datalist id={listId}>
          {suggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      ) : null}
    </div>
  );
}

/** Right-side slide-over used for every create / edit form. */
export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4.5 w-4.5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export { INK };

/** Comma / newline separated text <-> string[] helpers for list fields. */
export const linesToArray = (v: string) =>
  v
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
export const arrayToLines = (a?: string[]) => (a ?? []).join("\n");
