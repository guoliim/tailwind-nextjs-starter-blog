'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  useEffect(() => {
    return clearAllBodyScrollLocks
  })

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="transition-colors-fast sm:hidden"
        style={{
          color: 'var(--color-text-primary)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div
              className="fixed inset-0 z-60"
              style={{ backgroundColor: 'var(--color-surface-overlay)' }}
            />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-95"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-95"
            leaveTo="translate-x-full opacity-0"
            unmount={false}
          >
            <DialogPanel
              className="fixed top-0 left-0 z-70 h-full w-full duration-300"
              style={{
                backgroundColor: 'var(--color-surface-base)',
                opacity: 0.95,
              }}
            >
              <nav
                ref={navRef}
                className="flex h-full basis-0 flex-col items-start overflow-y-auto text-left"
                style={{
                  marginTop: 'var(--spacing-8)',
                  paddingTop: 'var(--spacing-2)',
                  paddingLeft: 'var(--spacing-12)',
                }}
              >
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="transition-colors-fast outline outline-0"
                    style={{
                      marginBottom: 'var(--spacing-4)',
                      paddingTop: 'var(--spacing-2)',
                      paddingBottom: 'var(--spacing-2)',
                      paddingRight: 'var(--spacing-4)',
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      letterSpacing: 'var(--tracking-widest)',
                      color: 'var(--color-text-primary)',
                    }}
                    onClick={onToggleNav}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>

              <button
                className="transition-colors-fast fixed z-80 h-16 w-16"
                style={{
                  top: 'var(--spacing-7)',
                  right: 'var(--spacing-4)',
                  padding: 'var(--spacing-4)',
                  color: 'var(--color-text-primary)',
                }}
                aria-label="Toggle Menu"
                onClick={onToggleNav}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
