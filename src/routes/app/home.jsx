import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { PageTitle } from "../../components/global/pageTitle"
import { PhotoCard } from "../../components/global/photoCard"
import { PhotoData } from "../../data/photos"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { useState } from "react"

export const Home = () => {
    const [photos, setPhotos] = useState(PhotoData)

    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

    console.log(photos)

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

    return (
        <section className="overflow-y-scroll overflow-x-hidden w-full p-6 space-y-6">
            <PageTitle title="Photos" number={photos.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd} sensors={sensors}>
                    <SortableContext items={photos} strategy={rectSortingStrategy}>
                        {photos.map((photo) =>
                            <PhotoCard
                                id={photo.id}
                                title={photo.title}
                                ext={photo.extension}
                                tags={photo.tag}
                                isVid={photo.vid}
                                fav={photo.fav}
                            />
                        )}
                    </SortableContext>
                </DndContext>
            </div>
        </section>
    )
}