import ImagemLogin from '/imagemLogin.png'
import '/src/index.css'

export default function LayoutAuth ({ children }) {

    return (
        <div className="fundoLogin flex bg-[#5494D2] rounded-4xl w-[150vh] min-h-[75vh] shadow-2xl">
            <div className="fundoImagem flex bg-[#FFFFFF] w-1/2 rounded-l-4xl">
                <img src={ImagemLogin} className="imagemLogin object-cover rounded-l-4xl"></img>
            </div>
            <div className='flex flex-1 items-center justify-center'>
                {children}
            </div>
        </div>
    )
}
