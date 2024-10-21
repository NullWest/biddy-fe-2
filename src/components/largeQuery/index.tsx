export default function LargeQuery({queryString}:{queryString:string}){
    return (
        <div className='flex justify-center'>
        <h1 className="text-5xl font-bold">
          {queryString}
        </h1>
      </div>
    )
}

