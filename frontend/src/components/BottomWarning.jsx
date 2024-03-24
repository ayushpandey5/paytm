import {Link} from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
  return (
    <div className="flex py-2 justify-center text-sm">
        <div>
            {label}
        </div>
        <Link className="cursor-pointer underline pl-1 text-slate-500" to={to}>
            {buttonText}
        </Link>
    </div>

  )
}
