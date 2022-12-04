import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PuzzlePiece } from '../utils/types'

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


interface PuzzleState {
  puzzles:PuzzlePiece[],
  setPuzzles: (puzzle: PuzzlePiece) => void,
  removePuzzle: (id: string) => void,
}

const usePuzzleStore = create<PuzzleState>((set) => ({
  puzzles: [],
  setPuzzles: (puzzle) => set((state) => {
    return {...state, puzzles: [...state.puzzles, puzzle]}
  }),
  removePuzzle: (id) => set((state) => {
    return {...state, puzzles: state.puzzles.filter((puzzle) => puzzle.pathId !== id)}
  })
}))





export {
  useImageStore,
  usePuzzleStore,
}