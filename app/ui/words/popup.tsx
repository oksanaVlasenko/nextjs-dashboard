export default function Popup() {
  return (
    // x-data="{ modal: true }" :className="{ 'hidden': !modal }"
    <section className="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
      <div className="p-4">
        <div className="relative p-6 py-11 bg-blueGray-900 bg-opacity-30 max-w-lg text-center w-full rounded-5xl">
          <h3 className="mb-4 text-3xl font-medium text-white tracking-3xl">Unsaved changes</h3>
          <p className="mb-8 text-white">Do you want to save or discard changes?</p>
          <div className="flex flex-wrap justify-center -m-2">
            <div className="w-auto p-2"><a className="inline-block px-14 py-4 text-white hover:text-black font-medium tracking-2xl hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300" href="#">Cancel</a></div>
            {/* x-on:click.prevent="modal = false" */}
            <div className="w-auto p-2"><a className="inline-block px-14 py-4 font-medium tracking-2xl border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300" href="#">Confirm</a></div>
          </div>
          {/* x-on:click.prevent="modal = false"  */}
          <a className="absolute top-6 right-6" href="#">
            <img src="nightsable-assets/images/modals/close-icon.png"/>
          </a>
        </div>
      </div>
    </section>
  )
}