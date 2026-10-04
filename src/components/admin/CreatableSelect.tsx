import { useState, useRef, useEffect, useCallback } from "react";
import { Plus, X, ChevronDown, Search } from "lucide-react";

interface CreatableSelectProps {
  /** All known options (fetched from backend). */
  suggestions: string[];
  /** Currently selected values (form state). */
  value: string[];
  /** Called whenever the selected values array changes. */
  onChange: (next: string[]) => void;
  placeholder?: string;
  /** Shown while suggestions are loading. */
  loading?: boolean;
}

/**
 * A zero-dependency "creatable" multi-select dropdown.
 * - Selecting an existing suggestion adds it to the list.
 * - Typing a new value shows a "+ Add 'value'" option.
 * - Each selected value renders as a removable chip.
 */
export function CreatableSelect({
  suggestions,
  value,
  onChange,
  placeholder = "Search or type a new destination…",
  loading = false,
}: CreatableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Close on outside click ────────────────────────────────────── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Derived lists ─────────────────────────────────────────────── */
  const lowerQuery = query.toLowerCase().trim();

  // Filter suggestions that aren't already selected
  const available = suggestions.filter(
    (s) => !value.includes(s) && s.toLowerCase().includes(lowerQuery)
  );

  // Should we show the "create new" option?
  const isExactMatch = suggestions.some((s) => s.toLowerCase() === lowerQuery) || value.some((v) => v.toLowerCase() === lowerQuery);
  const showCreate = lowerQuery.length > 0 && !isExactMatch;

  /* ── Handlers ──────────────────────────────────────────────────── */
  const select = useCallback(
    (item: string) => {
      if (!value.includes(item)) {
        onChange([...value, item]);
      }
      setQuery("");
      inputRef.current?.focus();
    },
    [value, onChange]
  );

  const remove = useCallback(
    (idx: number) => {
      onChange(value.filter((_, i) => i !== idx));
    },
    [value, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && query === "" && value.length > 0) {
      // Remove the last chip
      remove(value.length - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (showCreate) {
        select(query.trim());
      } else if (available.length > 0) {
        select(available[0]!);
      }
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const inputCls =
    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring";

  return (
    <div ref={wrapperRef} className="relative">
      {/* ── Selected chips ────────────────────────────────────────── */}
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <span
              key={`${v}-${i}`}
              className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
            >
              {v}
              <button
                type="button"
                onClick={() => remove(i)}
                className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-primary/20"
                aria-label={`Remove ${v}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* ── Input ─────────────────────────────────────────────────── */}
      <div className="relative">
        <Search
          size={15}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={`${inputCls} pl-9 pr-9`}
          placeholder={placeholder}
          autoComplete="off"
        />
        <ChevronDown
          size={16}
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* ── Dropdown ──────────────────────────────────────────────── */}
      {open && (
        <div className="absolute z-50 mt-1.5 max-h-52 w-full overflow-auto rounded-xl border border-border bg-card shadow-lg">
          {loading && (
            <div className="px-4 py-3 text-xs text-muted-foreground">
              Loading destinations…
            </div>
          )}

          {!loading && available.length === 0 && !showCreate && (
            <div className="px-4 py-3 text-xs text-muted-foreground">
              {query ? "No matching destinations" : "Type to search or add a destination"}
            </div>
          )}

          {available.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => select(item)}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-secondary/60"
            >
              {item}
            </button>
          ))}

          {showCreate && (
            <button
              type="button"
              onClick={() => select(query.trim())}
              className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-left text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              <Plus size={14} />
              Add "{query.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
