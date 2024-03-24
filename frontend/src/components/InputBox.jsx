export function InputBox({label, placeholder}) {
  return (
    <div>
        <div className="text-sm py-2 font-medium text-left">
            {label}
        </div>
        <input type="text" placeholder={placeholder} className="w-full rounded-md p-2" />
    </div>
  )
}
