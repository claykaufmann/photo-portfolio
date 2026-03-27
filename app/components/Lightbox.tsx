"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { Photo } from "@/types/types"

interface LightboxProps {
  photos: Photo[]
}

export default function Lightbox({ photos }: LightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const isOpen = selectedIndex !== null
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null

  const goTo = (index: number) => {
    if (index < 0) setSelectedIndex(photos.length - 1)
    else if (index >= photos.length) setSelectedIndex(0)
    else setSelectedIndex(index)
  }

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <button
            key={photo.url}
            onClick={() => setSelectedIndex(index)}
            className="mb-4 block w-full overflow-hidden rounded-lg cursor-pointer break-inside-avoid focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? `Photo ${index + 1}`}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto transition-opacity hover:opacity-90"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent
          className="max-w-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIndex(null)
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") goTo((selectedIndex ?? 0) - 1)
            if (e.key === "ArrowRight") goTo((selectedIndex ?? 0) + 1)
          }}
        >
          {selectedPhoto && (
            <div className="relative flex items-center justify-center max-h-[90vh] max-w-[90vw]">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.alt ?? "Full size photo"}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                sizes="90vw"
                priority
              />
            </div>
          )}

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo((selectedIndex ?? 0) - 1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo((selectedIndex ?? 0) + 1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Photo counter */}
          {selectedIndex !== null && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-sm text-white">
              {selectedIndex + 1} / {photos.length}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
