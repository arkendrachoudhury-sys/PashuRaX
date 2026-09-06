from fastapi import Request, status
from fastapi.responses import JSONResponse
from app.main import app

class NotFoundError(Exception):
    def __init__(self, message: str):
        self.message = message

class ForbiddenError(Exception):
    def __init__(self, message: str):
        self.message = message

class ConflictError(Exception):
    def __init__(self, message: str):
        self.message = message

class ValidationError(Exception):
    def __init__(self, message: str):
        self.message = message

@app.exception_handler(NotFoundError)
async def not_found_exception_handler(request: Request, exc: NotFoundError):
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": exc.message})

@app.exception_handler(ForbiddenError)
async def forbidden_exception_handler(request: Request, exc: ForbiddenError):
    return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content={"message": exc.message})

@app.exception_handler(ConflictError)
async def conflict_exception_handler(request: Request, exc: ConflictError):
    return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={"message": exc.message})

@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": exc.message})
