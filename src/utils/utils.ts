const clearCanvas = (canvas:React.RefObject<HTMLCanvasElement>) => {
    if(canvas.current){
      const ctx = canvas.current.getContext('2d');
      if(ctx){
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      }
    }
  }
  const drawImage = (image: File, canvas:React.RefObject<HTMLCanvasElement>) => {
    if(image && canvas.current){
      const ctx = canvas.current.getContext('2d');
      if(ctx){
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        }
      }
    }
  }

// create uniq string id
const createId = () => {
  return Math.random().toString(36).substr(2, 9);
}

  export {
    clearCanvas,
    drawImage,
    createId,
  }