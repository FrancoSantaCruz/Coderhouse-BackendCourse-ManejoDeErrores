export const errorMiddleware = async (error, req, res, next) => {
    try {
        await res.render("error", { message: error.message, name: error.name });
    } catch (err) {
        next(err); 
    }
};