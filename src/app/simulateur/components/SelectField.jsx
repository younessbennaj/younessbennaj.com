import * as React from 'react'
import * as Select from '@radix-ui/react-select'

import * as Tooltip from '@radix-ui/react-tooltip'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Select.ItemIndicator>
            <CheckIcon className="h-4 w-4" />
          </Select.ItemIndicator>
        </span>
        <Select.ItemText className="truncate">{children}</Select.ItemText>
      </Select.Item>
    )
  },
)
SelectItem.displayName = 'SelectItem'

export const SelectField = ({
  name,
  value,
  onValueChange,
  options,
  placeholder,
  className,
  label,
  tooltip,
  allowClear = false,
  required = false,
  hasError = false, // Nouveau prop hasError
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-1">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {tooltip && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <InformationCircleIcon className="size-5" aria-hidden="true" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 max-w-xs rounded-lg bg-white p-4 text-sm shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
                sideOffset={5}
              >
                <div className="space-y-2">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">
                    {tooltip.title}
                  </h4>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {tooltip.content}
                  </div>
                </div>
                <Tooltip.Arrow className="fill-white dark:fill-zinc-800" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>

    <Select.Root
      value={value}
      onValueChange={onValueChange}
      required={required}
    >
      <Select.Trigger
        className={cn(
          'flex h-10 w-full items-center justify-between overflow-hidden rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400',
          // Bordure conditionnelle basée sur hasError
          hasError
            ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-600'
            : 'border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-600',
          className,
        )}
        aria-label={label}
        aria-required={required}
        aria-invalid={hasError}
      >
        <span className="truncate">
          <Select.Value placeholder={placeholder} className="truncate" />
        </span>

        <Select.Icon className="h-4 w-4 shrink-0 opacity-50">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
          <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
            <ChevronUpIcon className="h-4 w-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {/* Option de désélection seulement si allowClear est true */}
            {allowClear && (
              <SelectItem value="__clear__">
                <span className="text-zinc-500">Aucun</span>
              </SelectItem>
            )}

            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
            <ChevronDownIcon className="h-4 w-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
)
