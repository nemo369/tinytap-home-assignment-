import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useImageStore, usePuzzleStore } from '../../state/state';
import { Path, Puzzle } from '../../utils/types';
import { clearCanvas, createId, drawImage, getShapeSize, trimCanvas } from '../../utils/utils';
import { Transition, Dialog } from '@headlessui/react';
import RemovePathDialog from '../ui/RemovePathDialog';
import PuzzlePices from './PuzzlePices';

export default function ImageCanvas() {
  const [shouldCapture, setShouldCapture] = useState(false);
  const [dialogId, setDialogId] = useState('')
  const [paths, setPaths] = useState<Path[]>([]);
  const [puzzlePieces, setPuzzlePieces] = useState<Puzzle[]>([]);
  const { image } = useImageStore(state => state);
  const { setPuzzles, removePuzzle:removePuzzlePieceFromState } = usePuzzleStore(state => state);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    clearCanvas(canvas);
    if (image) {
      drawImage(image, canvas).then(() => {
        puzzlePieces.forEach((puzzle) => {
          drawPath(puzzle); // sorry for this hacj, but it works
        });
      });

    }
  }, [image]);

  const startDrawPath = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setPaths([...paths, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);

  }

  const addPuzzlePiece = ({ctx, id}:{ctx:CanvasRenderingContext2D, id: string}) =>{
    const shape = getShapeSize(paths);
    const el = trimCanvas({ canvas: ctx, ...shape });
    const imgSrc = el.toDataURL();
    setPuzzles({
      imgSrc,
      pathId:id,
      width: shape.width,
      height: shape.height,
      initialLocation:{
        top: shape.top,
        left: shape.left,
        right: shape.right,
        bottom: shape.bottom,
      }
    });
  }
  const drawPath = ({paths, id}: Puzzle) => {
    const ctx = canvas.current?.getContext('2d');
    if (ctx) {
    
      addPuzzlePiece({ctx, id})
      ctx.beginPath();
      ctx.moveTo(paths[0].x, paths[0].y);
      paths.forEach((path) => {
        ctx.lineTo(path.x, path.y);
      });
      ctx.lineTo(paths[0].x, paths[0].y); // close the path
      ctx.strokeStyle = 'white';
      ctx.stroke();
      ctx.closePath();
      //paint the hole (where shape was cut from) in gray
      ctx.fillStyle = '#80808090';
      ctx.fill();


    }

  }
  const onMouseUp = () => {
    setShouldCapture(false);
    if (paths.length > 0) {
      const newPuzzle ={ paths, id: createId() }
      drawPath(newPuzzle);
      setPuzzlePieces([...puzzlePieces, newPuzzle]);
      setPaths([]);
    }
  }

  const removePuzzlePiece = (id: string) => {
    clearCanvas(canvas);
    if (!image) return;
    const newPuzzlePieces = puzzlePieces.filter(puzzle => puzzle.id !== id);
    removePuzzlePieceFromState(id);
    setPuzzlePieces(newPuzzlePieces);
    drawImage(image, canvas).then(() => {
      newPuzzlePieces.forEach((puzzle) => {
        drawPath(puzzle);
      });
    });
  }

  const getCanvasHeight = () => {
    // const image = new Image();
    return 480;
  }
  if (!image) {
    return <div className='text-center flex gap-x-2 bg-slate-200 max-w-md mx-auto my-2 py-2 px-6 rounded-lg shadow items-end'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>

      <span>Load Images and chose one to create a puzzle from</span>
    </div>
  }
  return (
    <>

      <div className='relative bg-gray-50 max-w-lg mx-auto' id="canvas-wrapper">
        <PuzzlePices/>
        <canvas
          onMouseMove={(e) => shouldCapture && startDrawPath(e)}
          onMouseUp={onMouseUp}
          onMouseDown={() => setShouldCapture(true)} ref={canvas} width={"480"} height={getCanvasHeight()}></canvas>
        {
          puzzlePieces.map((puzzlePiece) => (
            <button
              onClick={() => setDialogId(puzzlePiece.id)}
              key={puzzlePiece.id} className='absolute z-20 border rounded-full   bg-black/40 text-white text-center leading-[0px] w-4 h-4 text-xs hover:bg-black' style={{
                top: puzzlePiece.paths[0].y,
                left: puzzlePiece.paths[0].x,
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2.5 h-2.5 m-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

            </button>
          ))
        }
      </div>
      <RemovePathDialog dialogId={dialogId} removePuzzlePiece={removePuzzlePiece} setDialogId={setDialogId} />
      <h2 className='px-6 py-2 bg-blue-200 rounded-md text-sm italic mt-2 text-gray-600 flex gap-x-1 items-center w-max mx-auto'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <span>Please draw a path to create a puzzle piece, (click and drag on the image)</span>
      </h2>
    </>
  )
}

