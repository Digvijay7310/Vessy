const asyncHandler = async(req, res, next) => {
    try{
        await (req, res, next);
    } catch(error) {
        next(error)
    }
};


export default asyncHandler