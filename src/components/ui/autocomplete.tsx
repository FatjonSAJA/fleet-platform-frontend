import { Check, LoaderCircle, Search, X } from 'lucide-react'
import type * as React from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

export interface AutocompleteOption {
  label: string
  value: string
}

export interface AutocompleteProps {
  value?: string
  onValueChange?: (value: string) => void
  onSearch?: (query: string) => void
  options?: AutocompleteOption[]
  placeholder?: string
  emptyMessage?: string
  isLoading?: boolean
  disabled?: boolean
  clearable?: boolean
  debounceMs?: number
  className?: string
  inputClassName?: string
  showSearchIcon?: boolean
  'data-qa-id'?: string
}

function Autocomplete({
  value,
  onValueChange,
  onSearch,
  options = [],
  placeholder = 'Search...',
  emptyMessage = 'No results found.',
  isLoading = false,
  disabled = false,
  clearable = true,
  debounceMs = 300,
  className,
  inputClassName,
  showSearchIcon = true,
  'data-qa-id': qaId,
}: AutocompleteProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const debouncedQuery = useDebounce(query, debounceMs)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    if (debouncedQuery && isOpen) {
      onSearch?.(debouncedQuery)
    }
  }, [debouncedQuery, isOpen, onSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setQuery(newValue)
      setSelectedIndex(-1)
      if (!isOpen) {
        setIsOpen(true)
      }
    },
    [isOpen],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault()
          setIsOpen(true)
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && options[selectedIndex]) {
            onValueChange?.(options[selectedIndex].value)
            setQuery('')
            setIsOpen(false)
            setSelectedIndex(-1)
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setSelectedIndex(-1)
          break
        case 'Tab':
          setIsOpen(false)
          setSelectedIndex(-1)
          break
      }
    },
    [isOpen, options, selectedIndex, onValueChange],
  )

  const handleOptionSelect = useCallback(
    (option: AutocompleteOption) => {
      onValueChange?.(option.value)
      setQuery('')
      setIsOpen(false)
      setSelectedIndex(-1)
      inputRef.current?.focus()
    },
    [onValueChange],
  )

  const handleClear = useCallback(() => {
    onValueChange?.('')
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }, [onValueChange])

  const handleFocus = useCallback(() => {
    setIsOpen(true)
    if (query) {
      onSearch?.(query)
    }
  }, [query, onSearch])

  const showDropdown = isOpen && (options.length > 0 || isLoading || query)

  return (
    <div
      ref={containerRef}
      data-slot="autocomplete"
      className={cn('relative w-full', className)}
    >
      <div className="relative">
        {showSearchIcon && (
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        )}
        <Input
          ref={inputRef}
          type="text"
          value={selectedOption ? selectedOption.label : query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          data-qa-id={qaId ? `${qaId}_input` : undefined}
          className={cn(
            'h-12',
            showSearchIcon && 'pl-9',
            (clearable && value) || isLoading ? 'pr-9' : '',
            inputClassName,
          )}
          aria-label={placeholder}
          aria-autocomplete="list"
          aria-controls={isOpen ? listboxId : undefined}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        {isLoading && (
          <LoaderCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
        {!isLoading && clearable && value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full w-9 hover:bg-transparent"
            onClick={handleClear}
            disabled={disabled}
            data-qa-id={qaId ? `${qaId}_clear` : undefined}
            aria-label="Clear selection"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
      {showDropdown && (
        <div
          ref={listRef}
          id={listboxId}
          data-slot="autocomplete-list"
          className={cn(
            'absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
            'max-h-60 overflow-y-auto',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
          role="listbox"
          data-state={isOpen ? 'open' : 'closed'}
        >
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : options.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            options.map((option, index) => (
              <AutocompleteItem
                key={option.value}
                option={option}
                isSelected={option.value === value}
                isHighlighted={index === selectedIndex}
                onSelect={handleOptionSelect}
                data-qa-id={qaId ? `${qaId}_opt_${option.value}` : undefined}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

interface AutocompleteItemProps {
  option: AutocompleteOption
  isSelected: boolean
  isHighlighted: boolean
  onSelect: (option: AutocompleteOption) => void
  'data-qa-id'?: string
}

function AutocompleteItem({
  option,
  isSelected,
  isHighlighted,
  onSelect,
  'data-qa-id': qaId,
}: AutocompleteItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(option)
    }
  }

  return (
    <div
      data-slot="autocomplete-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none select-none',
        'hover:bg-accent hover:text-accent-foreground',
        isHighlighted && 'bg-accent text-accent-foreground',
        isSelected && 'font-medium',
      )}
      onClick={() => onSelect(option)}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => e.preventDefault()}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      data-qa-id={qaId}
    >
      <Check
        className={cn(
          'h-4 w-4 shrink-0',
          isSelected ? 'opacity-100' : 'opacity-0',
        )}
      />
      <span className="truncate">{option.label}</span>
    </div>
  )
}

export { Autocomplete, AutocompleteItem }
