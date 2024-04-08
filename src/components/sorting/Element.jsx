export function Element({value, width, isPicked}){
    const elementStyle = {
        minHeight: '30px',
        height: `${(value*4)}px`,
        width: `${width}`,
    }
    const elementColorClass = isPicked
    ?  'bg-slate-500'
    : 'bg-blue-500'
    return (
        <div 
            style={elementStyle}
            className={`animate-appear text-slate-200 mx-px font-bold ${elementColorClass} inline-block rounded-md flex justify-center items-center`}
        >
            {value}
        </div>
    )
}