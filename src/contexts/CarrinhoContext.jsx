import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinho must be used within a CarrinhoProvider');
    }
    return context;
};

export const CarrinhoProvider = ({ children }) => {
    const [carrinhoIds, setCarrinhoIds] = useState(() => {
        const saved = localStorage.getItem('carrinhoIds');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrinhoIds', JSON.stringify(carrinhoIds));
    }, [carrinhoIds]);

    const addProduto = (id) => {
        setCarrinhoIds(prev => {
            if (!prev.includes(id)) {
                return [...prev, id];
            }
            return prev;
        });
    };

    const removeProduto = (id) => {
        setCarrinhoIds(prev => prev.filter(item => item !== id));
    };

    return (
        <CarrinhoContext.Provider value={{ carrinhoIds, addProduto, removeProduto }}>
            {children}
        </CarrinhoContext.Provider>
    );
};