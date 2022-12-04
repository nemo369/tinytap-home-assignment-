import { Path } from "./types";

const clearCanvas = (canvas: React.RefObject<HTMLCanvasElement>) => {
  if (canvas.current) {
    const ctx = canvas.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }
  }
}
const drawImage = (image: File, canvas: React.RefObject<HTMLCanvasElement>) => {
  return new Promise((resolve, reject) => {

    if (image && canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
          ctx.drawImage(img, 0, 0, img.width > 480 ? 480 : img.width, img.width > 480 ? 480 * img.height / img.width : img.height);
          resolve(true)
        }
      }
    }
  }
  )
};

// create uniq string id
const createId = () => {
  return Math.random().toString(36) + Date.now().toString(36);
}

interface trimCanvasObj{
  canvas: CanvasRenderingContext2D,
  left: number,
  bottom: number,
  width: number,
  height: number
}
const trimCanvas = ({ canvas, left, bottom, width, height }:trimCanvasObj) => {
  const copy = document.createElement('canvas').getContext('2d')!

  const trimmed = canvas.getImageData(left, bottom, width, height)

  copy.canvas.width = width
  copy.canvas.height = height

  copy.putImageData(trimmed, 0, 0)

  return copy.canvas
}
const getShapeSize = (paths:Path[] ) => {
  let top = 0
  let bottom = 10000
  let right = 0
  let left = 10000

  paths.forEach((path) => {
    const {x, y} = path
    if(x > right) right = x
    if(x < left) left = x
    if(y > top) top = y
    if(y < bottom) bottom = y
    
  })

  const width = right - left
  const height = top - bottom

  return { width, height, left, right, top, bottom }
}
export {
  clearCanvas,
  drawImage,
  createId,
  trimCanvas,
  getShapeSize
}