import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createdOrUpdatedText(createdAt: Date, updatedAt: Date) {
  if (dayjs(createdAt).isBefore(updatedAt)) {
    return `Updated on ${dayjs(updatedAt).format('MMM D, YYYY')}`
  }
  return `Created on ${dayjs(createdAt).format('MMM D, YYYY')}`
}
