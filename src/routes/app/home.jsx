import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { PageTitle } from "../../components/global/pageTitle"
import { PhotoCard } from "../../components/global/photoCard"
import { PhotoData } from "../../data/photos"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { PhotoCardSkeleton } from "../../components/global/photoSkeleton"

export const Home = () => {
    const [photos, setPhotos] = useState(PhotoData)

    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

    const handleOnDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        setPhotos((photo) => {
            const oldIndex = photo.findIndex((user) => user.id === active.id);
            const newIndex = photo.findIndex((user) => user.id === over.id);
            return arrayMove(photo, oldIndex, newIndex);
        });

        setActiveId(null);
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="overflow-y-scroll overflow-x-hidden w-full p-6 space-y-6 relative">
            <PageTitle title="Photos" number={photos.length} />

            {loading ? <PhotoCardSkeleton num={photos.length} /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd} sensors={sensors}>
                    <SortableContext items={photos} strategy={rectSortingStrategy}>
                        {photos.map((photo) =>
                            <PhotoCard
                                id={photo.id}
                                title={photo.title}
                                file={photo.file}
                                tags={photo.tag}
                                isVid={photo.vid}
                                fav={photo.fav}
                            />
                        )}
                    </SortableContext>
                </DndContext>
            </div>}
        </section>
    )
}