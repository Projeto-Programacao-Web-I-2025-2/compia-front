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
            if (!prev.some(([itemId]) => itemId === id)) {
                return [...prev, [id, 1]];
            }
            return prev;
        });
    };

    const removeProduto = (id) => {
        setCarrinhoIds(prev => prev.filter(([item]) => item !== id));
    };

    const changeQtd = (id, qtd) => {
        const novaQtd = Math.max(1, qtd);
        
        setCarrinhoIds(prev => {
            return prev.map(([itemId, qtdAntiga]) => 
                itemId === id ? [itemId, novaQtd] : [itemId, qtdAntiga]
            );
        });
    }

    const getQtd = (id) => {
        const item = carrinhoIds.find(([itemId]) => itemId === id);
        return item ? item[1] : 1;
    }

    return (
        <CarrinhoContext.Provider value={{ carrinhoIds, addProduto, removeProduto, changeQtd, getQtd }}>
            {children}
        </CarrinhoContext.Provider>
    );
};