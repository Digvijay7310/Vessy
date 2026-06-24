let io;

export const setIo = (socketInstance) => {
    io = socketInstance;
};

export const getIo = () => io;