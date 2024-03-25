export function Button({label, onClick}) {
  return (
    <div>
       <button onClick={onClick} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {label}
        </button>
    </div>
  )
}
