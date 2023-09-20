export const EmailVerification = () => {
    return (
        <section className="lg:h-[100dvh] overflow-hidden p-6 py-10"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="text-4xl h-full text-gray-900 flex flex-col items-center justify-center">
                <img src={logo} alt="logo" className="w-32 mb-12" />
                <h1>Your email has been verified!</h1>
                <p>You can continue using snap & sync :)</p>
            </div>
        </section>
    )
}