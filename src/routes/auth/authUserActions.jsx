import { Oval } from "react-loader-spinner"

export const AuthUserActions = () => {
    return (
        <section className="bg-sky-400 w-[100vw] h-[100vh] absolute top-0 right-0 flex flex-col  gap-8 justify-center items-center z-[2000] text-3xl text-white font-bold">
            <p>Loading</p>
            < Oval
                height={100}
                width={100}
                color="#ffff"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffff"
                strokeWidth={4}
                strokeWidthSecondary={4}
            />
        </section>
    )
}