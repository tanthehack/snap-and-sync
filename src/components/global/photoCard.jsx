import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import * as Icon from '@heroicons/react/24/solid'
import { PhotoData } from "../../data/photos";
import { useState } from "react";

export const PhotoCard = ({ title, id, tags, fav, isVid, file }) => {
    const [photos, setPhotos] = useState(PhotoData)
    const [addFav, setAddFav] = useState(fav)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className="flex flex-col overflow-hidden rounded-xl h-[350px] lg:w-[300px] w-full relative" key={id} ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {isVid ?
                <video
                    src={`${file}`}
                    loop
                    autoPlay
                    className="w-full h-full"
                />
                : <div
                    style={{
                        backgroundImage: `url(${file})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                    }}
                    className="w-full h-full"
                ></div>}
            <div className="bg-slate-300 dark:bg-slate-800 h-2/ p-6 space-y-2">
                <p>{title}</p>
                <span className="flex items-center gap-2">
                    {tags.map((tag) => (
                        <span className="text-xs border-[1px] bg-[rgb(56,189,248,0.33)] border-sky-400 rounded-full py-1 px-2"> #{tag} </span>
                    ))}
                </span>
            </div>
        </div>
    )
}