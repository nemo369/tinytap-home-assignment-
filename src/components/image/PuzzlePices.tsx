import React from 'react'
import { usePuzzleStore } from '../../state/state';
import { PuzzlePiece } from '../../utils/types';

const Piece = ({ puzzle }: { puzzle: PuzzlePiece }) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [location, setLocation] = React.useState({ x: 0, y: 0 });
    const drag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = document.querySelector(`#canvas-wrapper`)!.getBoundingClientRect();
        let x = location.x + e.movementX;
        let y = location.y + e.movementY;
        setLocation({ x,y });

    }

    return (<div key={puzzle.imgSrc} className='absolute  z-30'
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={(e) => {
            console.log(isDragging);
            if (isDragging) {
                e.stopPropagation();
                drag(e)
            }
        }}
        onMouseLeave={() => setIsDragging(false)}

        style={{
            top: puzzle.initialLocation.top,
            left: puzzle.initialLocation.left,
            right: puzzle.initialLocation.right,
            bottom: puzzle.initialLocation.bottom,
            width: puzzle.width,
            height: puzzle.height,
            transform: `translate(${location.x}px, ${location.y}px)`,
        }}>
        <img src={puzzle.imgSrc} alt="" className='max-w-none pointer-events-none'
            width={puzzle.width}
            height={puzzle.height}

        />
    </div>)
}

export default function PuzzlePices() {

    const { puzzles } = usePuzzleStore(state => state);

    return (
        <div>
            {
                puzzles.map((puzzle) => (<Piece puzzle={puzzle} key={puzzle.pathId} />))
            }
        </div>
    )
}
