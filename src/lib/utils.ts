// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' XOF'
}

export function generateOrderNumber(): string {
  const date = new Date()
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, '')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SLF-${ymd}-${rand}`
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
