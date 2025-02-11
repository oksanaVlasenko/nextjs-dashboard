import Image from 'next/image';

export default function NewLogin() {
  return (
    <section className="bg-neutral-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2">
              <div className="px-8 md:px-16 pt-16 pb-20">
                <form action="#">
                  <span className="inline-block text-neutral-600 text-xl font-semibold tracking-tight mb-4">Account</span>
                  <h5 className="text-6xl font-semibold mb-6 font-heading">Try a demo for free</h5>
                  <p className="text-neutral-600 font-medium tracking-tight mb-16">At the heart of our success is a diverse and talented team.</p>
                  <a className="flex justify-center items-center text-center w-full mb-6 px-4 py-2 font-semibold tracking-tight hover:text-white border border-neutral-900 bg-white hover:bg-neutral-900 focus:bg-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200" href="#">
                    <img className="mr-6 h-8" src="mirga-assets/images/sign-in/google.svg" alt=""/>
                    <span>Continue with Google</span>
                  </a>
                  <p className="text-center text-neutral-600 font-medium tracking-tight mb-4">OR</p>
                  <label className="block mb-3 text-neutral-600 font-medium tracking-tight" htmlFor="name">Your Name</label>
                  <div className="flex flex-wrap -m-3 mb-3">
                    <div className="w-full p-3">
                      <input className="w-full px-8 py-5 outline-none rounded-lg border border-neutral-100 placeholder-neutral-300 font-medium focus:ring-4 focus:ring-neutral-100 transition duration-200" id="name" type="text" placeholder="ex. d.duncan@email.com"/>
                    </div>
                    <div className="w-full p-3">
                      <button className="flex justify-center items-center text-center h-full w-full px-4 py-3 font-semibold tracking-tight text-lg text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200" type="submit">Register now</button>
                    </div>
                  </div>
                  <a className="inline-block text-neutral-600 text-sm font-medium hover:text-neutral-800 tracking-tight transition duration-200" href="#">Already have an account? Log in</a>
                </form>
              </div>
            </div>
            <div className="w-full relative xl:w-1/2">
              <div className="bg-orange-500 rounded-3xl min-h-[550px] md:px-10 pt-6 md:pt-12 pb-8 md:pb-16 relative h-full">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br rounded-3xl from-orange-400 via-pink-500 to-purple-600 opacity-50"></div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs md:max-w-md">
                  <div className="bg-white rounded-5xl px-4 rounded-3xl md:px-10 pt-6 md:pt-12 pb-8 md:pb-16">
                    <p className="text-neutral-400 font-medium tracking-tight mb-10">Shape Tomorrow with Digital Learning Today!</p>
                    
                    <Image
                      width={260}
                      height={320}
                      src='/happy-cat.jpeg'
                      priority={true}
                      className="mx-auto"
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}