import { useEffect, useState } from "react"
import { PageTitle } from "../../components/global/pageTitle"
import { PhotoData } from "../../data/photos"
import * as Icon from '@heroicons/react/24/solid'
import { TagsData } from "../../data/tags"
import { PhotoCard } from "../../components/global/photoCard"
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { PhotoCardSkeleton } from "../../components/global/photoSkeleton"

export const Tags = () => {
    const [photos, setPhotos] = useState(PhotoData)
    const [activeTag, setActiveTag] = useState('meme')

    const handleSelectTag = (tag) => {
        setActiveTag(tag)
    }

    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

    const [loading, setLoading] = useState(false);
    const [num, setNum] = useState(1);

    photos.map((photo) => {
        if (photo.tag.includes(activeTag))
            () => setNum(prev => prev++)
    })

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
            <PageTitle title="Tags" number={12} />

            <div className="flex flex-wrap items-center gap-2">
                {TagsData.map((tag) => (
                    <span
                        id={tag.name}
                        onClick={() => handleSelectTag(tag.name)}
                        className={`${activeTag == tag.name ? "bg-sky-400 text-white" : "bg-[rgb(56,189,248,0.33)] hover:bg-[rgb(56,189,248,0.4)] text-sky-800 dark:text-sky-400"} text-xs lg:text-base border-[1px] border-sky-400 rounded-full py-1 px-4 hover:cursor-pointer`}>
                        {tag.name}
                    </span>
                ))}
            </div>

            {loading ? <PhotoCardSkeleton num={12} /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd} sensors={sensors}>
                    <SortableContext items={photos} strategy={rectSortingStrategy}>
                        {photos.map((photo) => (
                            photo.tag.includes(activeTag) ?
                                <PhotoCard
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