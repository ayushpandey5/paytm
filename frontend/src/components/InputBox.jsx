export function InputBox({label, placeholder, onChange}) {
  return (
    <div>
        <div className="text-sm py-2 font-medium text-left">
            {label}
        </div>

        {label=="Password" ? <input  onChange={onChange} type="password" placeholder={placeholder} className="w-full rounded-md p-2" /> : <input type="text"  onChange={onChange} placeholder={placeholder} className="w-full rounded-md p-2" />}
    </div>
  )
}
