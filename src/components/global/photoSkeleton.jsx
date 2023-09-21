export const PhotoCardSkeleton = ({ num }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array(num).fill().map((item, i) => (
                    <div key={i} className="flex flex-col overflow-hidden rounded-xl h-[350px] lg:w-[300px] w-full relative animate-pulse">
                        <div className="w-full h-full bg-slate-700" />
                        <div className="bg-slate-300 dark:bg-slate-800 h-2/ p-6 space-y-2">
                            <span className="bg-slate-700 w-2/5 p-2 rounded-full block"></span>
                            <span className="flex items-center gap-2">
                                <span className="bg-slate-700 rounded-full p-2 w-2/5"></span>
                                <span className="bg-slate-700 rounded-full p-2 w-2/5"></span>
                                <span className="bg-slate-700 rounded-full p-2 w-2/5"></span>
                                <span className="bg-slate-700 rounded-full p-2 w-2/5"></span>
                                <span className="bg-slate-700 rounded-full p-2 w-2/5"></span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}