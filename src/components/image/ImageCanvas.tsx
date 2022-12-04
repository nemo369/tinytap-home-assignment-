import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useImageStore } from '../../state/state';
import { Path, Puzzle } from '../../utils/types';
import { clearCanvas, createId, drawImage } from '../../utils/utils';
import { Transition, Dialog } from '@headlessui/react';

export default function ImageCanvas() {
  const [shouldCapture, setShouldCapture] = useState(false);
  const [dialogId, setDialogId] = useState('')
  const [paths, setPaths] = useState<Path[]>([]);
  const [puzzlePieces, setPuzzlePieces] = useState<Puzzle[]>([]);
  const { image } = useImageStore(state => state);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    clearCanvas(canvas);
    if (image) {
      drawImage(image, canvas);
    }
  }, [image]);

  const startDrawPath = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setPaths([...paths, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);

  }

  const drawPath = (paths: Path[]) => {
    const ctx = canvas.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(paths[0].x, paths[0].y);
      paths.forEach((path) => {
        ctx.lineTo(path.x, path.y);
      });
      // ctx.lineTo(paths[0].x, paths[0].y); // close the path
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
      drawPath(paths);
      setPuzzlePieces([...puzzlePieces, { paths, id: createId() }]);
      setPaths([]);
    }
  }

  const removePuzzlePiece = (id: string) => {
    clearCanvas(canvas);
    if (!image) return;
    const newPuzzlePieces = puzzlePieces.filter(puzzle => puzzle.id !== id);
    setPuzzlePieces(newPuzzlePieces);
    drawImage(image, canvas);
    //redraw the remaining puzzle pieces
    newPuzzlePieces.forEach((puzzle) => {
      setTimeout(() => {
        drawPath(puzzle.paths); // sorry for this hacj, but it works
      }, 100);
    });
  }

  if (!image) {
    return <div className='text-center'>No image set</div>
  }
  return (
    <>

      <div className='relative bg-gray-50 max-w-md mx-auto'>
        <canvas
          onMouseMove={(e) => shouldCapture && startDrawPath(e)}
          onMouseUp={onMouseUp}
          onMouseDown={() => setShouldCapture(true)} ref={canvas} width={"480"} height={"480"}></canvas>
        {
          puzzlePieces.map((puzzlePiece) => (
            <button
              onClick={() => setDialogId(puzzlePiece.id)}
              key={puzzlePiece.id} className='absolute z-20 border rounded-full   bg-black/40 text-white text-center leading-[0px] w-4 h-4 text-xs hover:bg-black' style={{
                top: puzzlePiece.paths[0].y,
                left: puzzlePiece.paths[0].x,
              }}>
              &times;
            </button>
          ))
        }
      </div>
      <Transition show={!!dialogId} as={Fragment}>

        <Dialog open={!!dialogId} onClose={() => setDialogId('')}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-md rounded bg-white px-6 py-8">
                <Dialog.Title className="text-sm  text-gray-500">Remove Pieve</Dialog.Title>
                <Dialog.Description className="text-lg bold mb-10">
                  Are you sure you want to delete this piece?
                </Dialog.Description>
                <div className="flex gap-x-4 py-6 justify-end" >
                <button onClick={() => setDialogId('')}
                    className='bg-gray-500 text-white px-6 py-2 rounded'
                  >Cancel</button>
                  <button
                    className='bg-red-500 text-white px-6 py-2 rounded'
                    onClick={() => {
                      removePuzzlePiece(dialogId)
                      setDialogId('');
                    }}>Delete</button>
                 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <h2 className='px-6 py-2 bg-blue-200 mx-6 rounded-md text-sm italic mt-2 text-gray-600'>Please draw a path to create a puzzle piece</h2>
    </>
  )
}

