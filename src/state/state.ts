import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ImageState {
  images: File[],
  image: File | null,
  setImage: (image: File | null) => void,
  setImages: (images: File) => void,
}

const useImageStore = create<ImageState>((set) => ({
  image: null,
  images: [],
  setImages: (image) => set((state) => {
    return {...state, images: [...state.images, image]}
  }),
  setImage: (image: File | null) => set({ image })
}))

export {
  useImageStore
}