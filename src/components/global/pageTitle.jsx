export const PageTitle = ({ title, number }) => {
    const dateObject = new Date();
    const date = dateObject.toLocaleString('en-us', { month: 'long' }) + " " + dateObject.getDate() + ", " + dateObject.getFullYear();
    return (
        <div className="flex flex-col justify-between w-full gap-[10px]">
            <h1 className="text-5xl">{title}</h1>
            <div className="flex items-center gap-1">
                <span className="text-sm font-bold">{date} </span>
                <span className="text-sm">• {number} Images</span>
            </div>
        </div>
    )
}