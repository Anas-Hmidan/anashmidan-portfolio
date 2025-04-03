export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-teal-400 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-teal-400 text-lg">Loading...</p>
      </div>
    </div>
  )
}

