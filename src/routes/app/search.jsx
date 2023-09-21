import { useEffect, useState } from "react"
import { PhotoData } from "../../data/photos"
import { PhotoCard } from "../../components/global/photoCard"
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { PhotoCardSkeleton } from "../../components/global/photoSkeleton"
import { Link, useParams } from "react-router-dom"
import * as Icon from '@heroicons/react/24/solid'

export const SearchResults = () => {
    const [photos, setPhotos] = useState(PhotoData)
    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

    const [loading, setLoading] = useState(false);

    const { query } = useParams()

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleOnDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        setPhotos((photo) => {
            const oldIndex = photo.findIndex((user) => user.id === active.id);
            const newIndex = photo.findIndex((user) => user.id === over.id);
            return arrayMove(photo, oldIndex, newIndex);
        });
    }

    return (
        <section className="overflow-y-scroll overflow-x-hidden w-full p-6 space-y-6">
            <span className="flex items-center gap-4">
                <Link to='/app'><Icon.ArrowLeftIcon className="w-6 h-6 hover:text-sky-400" /></Link>
                <h1 className="text-5xl">Search Results</h1>
            </span>

            {loading ? <PhotoCardSkeleton num={12} /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd} sensors={sensors}>
                    <SortableContext items={photos} strategy={rectSortingStrategy}>
                        {photos.map((photo) => (
                            photo.tag.includes(query) ?
                                <PhotoCard
                                    key={photo.id}
                                    id={photo.id}
                                    title={photo.title}
                                    file={photo.file}
                                    tags={photo.tag}
                                    isVid={photo.vid}
                                    fav={photo.fav}
                                /> : null))}
                    </SortableContext>
                </DndContext>
            </div>}

        </section>
    )
}